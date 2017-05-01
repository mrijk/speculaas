const _ = require('lodash');

const {gen} = require('./gen');

function tuple(...predicates) {
    return {
        conform: values => values.length === predicates.length &&
            _.zip(predicates, values).every(([p, v]) => p(v)),
        unform: _.identity,
        gen: () => _.map(predicates, gen)
    };
}

module.exports = tuple;
