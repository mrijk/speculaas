const _ = require('lodash');

const defs = {};

function alt(...predicates) {
    return value => true;
}

function and(...predicates) {
    return value => _.every(predicates, predicate => predicate(value));
}

function or(...predicates) {
    return value => _.some(predicates, predicate => predicate(value));
}

function collOf(predicate, {kind, count, distinct = false, into}) {
    const uniq = value => !distinct || isUnique(value);
    const checkCount = value => !count || value.length === count;

    return value => kind(value) && uniq(value) && checkCount(value) && _.every(value, value => predicate(value));
}

function mapOf(kpred, vpred, {count}) {
    return value => _.every(value, (v, k) => vpred(v) && kpred(k));
}

function isUnique(value) {
    return _.uniq(value).length === value.length;
}

function conform(spec, value) {
    return isValid(spec, value) ? value : ':node.spec/invalid';
}

function isValid(spec, value) {
    let predicate;
    if (_.isFunction(spec)) {
        predicate = spec;
    } else if (_.isArray(spec)) {
        predicate = value => _.includes(spec, value);
    } else {
        predicate = defs[spec];
    }
    return predicate(value);
}

function def(spec, predicate) {
    let entry = predicate;
    if (_.isArray(predicate)) {
        entry = value => _.includes(predicate, value);
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
    return values => values.length > 0 && _.every(values, value => predicate(value));
}

function question(spec) {
    const predicate = defs[spec];
    return values => values.length === 0 || (values.length == 1 && predicate(values[0]));
}

function star(spec) {
    const predicate = defs[spec];
    return values => _.every(values, value => predicate(value));
}

function tuple(...predicates) {
    return values => values.length === predicates.length &&
        _.zip(predicates, values).every(([p, v]) => p(v));
}

module.exports = {
    alt,
    and,
    collOf,
    conform,
    def,
    explain,
    gen,
    getSpec,
    intIn,
    isIntInRange,
    isValid,
    mapOf,
    nilable,
    or,
    plus,
    question,
    star,
    tuple
};
