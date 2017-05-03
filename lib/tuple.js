const _ = require('lodash');

const {spec: specize} = require('./def');
const {gen} = require('./gen');
const isValid = require('./isValid');

function tuple(...predicates) {
    return {
        conform: values => values.length === predicates.length &&
            _.zip(predicates, values).every(([p, v]) => isValid(specize(p), v)),
        unform: _.identity,
        gen: () => _.map(predicates, gen)
    };
}

module.exports = tuple;
