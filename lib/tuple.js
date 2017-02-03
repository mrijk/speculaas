const _ = require('lodash');

function tuple(...predicates) {
    return values => values.length === predicates.length &&
        _.zip(predicates, values).every(([p, v]) => p(v));
}

module.exports = tuple;
