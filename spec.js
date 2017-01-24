const _ = require('lodash');

const defs = {};

function and(...predicates) {
    return value => _.every(predicates, predicate => predicate(value));
}

function or(...predicates) {
    return value => _.some(predicates, predicate => predicate(value));
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

module.exports = {
    and,
    conform,
    def,
    explain,
    isValid,
    or,
    plus,
    question,
    star
};
