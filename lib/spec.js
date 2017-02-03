const _ = require('lodash');

const functions = require('./functions');
const {def, getSpec} = require('./def');
const {isValid} = require('./isValid');

let _checkAsserts = false;

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

function isCheckAsserts() {
    return _checkAsserts;
}

function conform(spec, value) {
    if (_.isFunction(spec)) {
        const result = spec(value);
        return result ? value : ':node.spec/invalid';
    } else {
        const def = getSpec(spec);
        const predicate = def.conform ? def.conform : def;
        const result = predicate(value);
        if (_.isBoolean(result)) {
            return result ? value : ':node.spec/invalid';
        } else {
            return result ? result : ':node.spec/invalid';
        }
    }
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

function star(spec) {
    return values => _.every(values, value => isValid(spec, value)) ? values : null;
}

module.exports = {
    alt,
    amp,
    and: require('./and'),
    assert,
    cat,
    checkAsserts,
    collOf: require('./collOf'),
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
    keys: require('./keys'),
    mapOf: require('./mapOf'),
    merge: require('./merge'),
    nilable,
    or,
    plus,
    question: require('./question'),
    star,
    tuple: require('./tuple')
};
