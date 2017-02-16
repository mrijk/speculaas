const _ = require('lodash');

const testcheck = require('testcheck');

const {gen} = require('./gen');

function tuple(...predicates) {
    return {
        conform: values => values.length === predicates.length &&
            _.zip(predicates, values).every(([p, v]) => p(v)),
        gen: () => testcheck.gen.bind(testcheck.gen.null, () => {
            return testcheck.gen.array(_.map(predicates, gen));
        })
    };
}

module.exports = tuple;
