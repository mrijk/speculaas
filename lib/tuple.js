const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

const {gen} = require('./gen');

function tuple(...predicates) {
    return {
        conform: values => values.length === predicates.length &&
            _.zip(predicates, values).every(([p, v]) => p(v)),
        unform: _.identity,
        gen: () => tcg.bind(tcg.null, () => tcg.array(_.map(predicates, gen)))
    };
}

module.exports = tuple;
