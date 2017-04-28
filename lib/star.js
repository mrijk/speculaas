const _ = require('lodash');

const testcheck = require('testcheck');

const {gen} = require('./gen');

const isValid = require('./isValid');

function star(spec) {
    return {
        op: 'star',
        conform: values => _.every(values, value => isValid(spec, value)) ? values : null,
        unform: _.identity,
        gen: () => testcheck.gen.bind(testcheck.gen.null, () => {
            const result = gen(spec);
            return testcheck.gen.array(result, _.random(0, 5));
        })
    };
}

module.exports = star;
