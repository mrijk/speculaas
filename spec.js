const _ = require('lodash');

const defs = {};

const invalidString = ':node.spec/invalid';

function alt(...predicates) {
    return value => true;
}

function and(...predicates) {
    return value => _.every(predicates, predicate => predicate(value)) ? value : null;
}

function cat(...predicates) {
    return values => values.length === predicates.length / 2 &&
        _.zip(_.chunk(predicates, 2), values).every(([[_, p], v]) => p(v));
}

function or(...predicates) {
    return value => {
        const found = _.find(_.chunk(predicates, 2), ([_, predicate]) => predicate(value));
        return _.isUndefined(found) ? null : [found[0], value];
    };
}

function collOf(predicate, {kind, count, distinct = false, into}) {
    const uniq = value => !distinct || isUnique(value);
    const checkCount = value => !count || value.length === count;

    return value => kind(value) && uniq(value) && checkCount(value) && _.every(value, value => predicate(value));
}

function isUnique(value) {
    return _.uniq(value).length === value.length;
}

function conform(spec, value) {
    if (_.isFunction(spec)) {
        const result = spec(value);
        return result ? value : ':node.spec/invalid';
    } else {
        const predicate = defs[spec];
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
        predicate = value => _.includes(spec, value);
    } else {
        const def = defs[spec];
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
    const predicate = defs[spec];
    if (predicate(value)) {
        return 'Success!'
    } else {
        return `val: ${value} fails spec: :even? predicate: ${spec}`;
    }
}

function gen(spec) {
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

function plus(spec) {
    const predicate = defs[spec];
    return values => (values.length > 0 && _.every(values, value => predicate(value))) ? values : null;
}

function question(spec) {
    const predicate = defs[spec];
    return values => (values.length === 0 || (values.length == 1 && predicate(values[0]))) ? values : null;
}

function star(spec) {
    const predicate = defs[spec];
    return values => _.every(values, value => predicate(value)) ? values : null;
}

function tuple(...predicates) {
    return values => values.length === predicates.length &&
        _.zip(predicates, values).every(([p, v]) => p(v));
}

module.exports = {
    alt,
    and,
    cat,
    collOf,
    conform,
    def,
    explain,
    gen,
    getSpec,
    intIn,
    invalidString,
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
