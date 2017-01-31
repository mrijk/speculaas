const _ = require('lodash');

const functions = require('./functions');

let _checkAsserts = false;
const defs = {};

const invalidString = ':node.spec/invalid';

function alt(...predicates) {
    return value => true;
}

function amp(re, ...preds) {
    return {
        conform: value => {
            const result = conform(re, value);
            return result !== invalidString && _.every(preds, p => p(result)) ? result : null;
        }
    };
}

function and(...predicates) {
    return value => _.every(predicates, predicate => predicate(value)) ? value : null;
}

function assert(spec, value) {
    if (_checkAsserts) {
        if (isValid(spec, value)) {
            return value;
        } else {
            throw new Error('Spec assertion failed');
        }
    } else {
        return value;
    }
}

function cat(...predicates) {
    return {
        conform: values => values.length === predicates.length / 2 &&
            _.zip(_.chunk(predicates, 2), values).every(([[, p], v]) => isValid(p, v))
    };
}

function checkAsserts(check) {
    return _checkAsserts = check;
}

function collOf(predicate, {kind = () => true, count, distinct = false, into} = {}) {
    const uniq = value => !distinct || isUnique(value);
    const checkCount = value => !count || value.length === count;

    return value => kind(value) && uniq(value) && checkCount(value) && _.every(value, value => predicate(value));
}

function isCheckAsserts() {
    return _checkAsserts;
}

function isUnique(value) {
    return _.uniq(value).length === value.length;
}

function conform(spec, value) {
    if (_.isFunction(spec)) {
        const result = spec(value);
        return result ? value : ':node.spec/invalid';
    } else {
        const def = defs[spec];
        const predicate = def.conform ? def.conform : def;
        const result = predicate(value);
        if (_.isBoolean(result)) {
            return result ? value : ':node.spec/invalid';
        } else {
            return result ? result : ':node.spec/invalid';
        }
    }
}

function isValid(spec, value) {
    let predicate;
    if (_.isFunction(spec)) {
        predicate = spec;
    } else if (_.isArray(spec)) {
        // TODO: not correct for array of specs yet!
        predicate = value => _.includes(spec, value);
    } else {
        const def = defs[spec];
        if (_.isUndefined(def)) {
            throw new Error(`Unable to resolve spec ${spec}`);
        }
        predicate = def.conform ? def.conform : def;
    }
    const result = predicate(value);
    return _.isBoolean(result) ? result : result !== null;
}

function keys({req = [], opt = []}) {
    return {
        req,
        opt,
        conform: value =>
            _.every(req, key => isValidRequiredKey(value, key)) &&
            _.every(opt, key => isValidOptionalKey(value, key))
    };
}

function isValidOptionalKey(value, key) {
    return !_.has(value, key) || isValid(key, value[key]);
}

function isValidRequiredKey(value, key) {
    return _.has(value, key) && isValid(key, value[key]);
}

function mapOf(kpred, vpred, {count}) {
    return value => _.every(value, (v, k) => vpred(v) && kpred(k));
}

function merge(...predicates) {
    const {req, opt} = _.reduce(predicates,
                                ({req, opt}, p) => {
                                    const spec = _getSpec(p);
                                    return {
                                        req: _.concat(req, spec.req),
                                        opt: _.concat(opt, spec.opt)
                                    };
                                },
                                {req: [], opt: []});
    return keys({req, opt});
}

function _getSpec(p) {
    if (_.isString(p)) {
        return defs[p];
    } else if (_.isObject(p)) {
        return p;
    } else {
        return null;
    }
}

function def(spec, predicate) {
    let entry = predicate;
    if (_.isArray(predicate)) {
        entry = value => _.includes(predicate, value);
    } else if (_.isString(predicate)) {
        // Reference to another existing spec
        entry = getSpec(predicate);
    }
    defs[spec] = entry;
}

function explain(spec, value) {
    console.log(explainStr(spec, value));
}

function explainStr(spec, value) {
    if (isValid(spec, value)) {
        return 'Success!\n';
    } else {
        return `val: ${value} fails predicate: :even? predicate: ${spec}\n`;
    }
}

function fdef(fnSym, {args, ret, fn}) {
}

function gen(spec) {
    if (_.isFunction(spec)) {
        return functions.gen(spec);
    } else {
        return null;
    }
}

function getSpec(k) {
    return defs[k];
}

function intIn(start, end) {
    return value => isIntInRange(start, end, value);
}

function isIntInRange(start, end, val) {
    return _.inRange(val, start, end);
}

function nilable(predicate) {
    return value => (value !== null) ? predicate(value) : true;
}

function or(...predicates) {
    return value => {
        const found = _.find(_.chunk(predicates, 2), ([, predicate]) => predicate(value));
        return _.isUndefined(found) ? null : [found[0], value];
    };
}

function plus(spec) {
    return values => (values.length > 0 && _.every(values, value => isValid(spec, value))) ? values : null;
}

function question(spec) {
    const predicate = defs[spec];
    return values => (values.length === 0 || (values.length == 1 && predicate(values[0]))) ? values : null;
}

function star(spec) {
    return values => _.every(values, value => isValid(spec, value)) ? values : null;
}

function tuple(...predicates) {
    return values => values.length === predicates.length &&
        _.zip(predicates, values).every(([p, v]) => p(v));
}

module.exports = {
    alt,
    amp,
    and,
    assert,
    cat,
    checkAsserts,
    collOf,
    conform,
    def,
    explain,
    explainStr,
    fdef,
    gen,
    getSpec,
    intIn,
    invalidString,
    isCheckAsserts,
    isIntInRange,
    isValid,
    keys,
    mapOf,
    merge,
    nilable,
    or,
    plus,
    question,
    star,
    tuple
};
