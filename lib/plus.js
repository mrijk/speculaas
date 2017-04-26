const _ = require('lodash');

const testcheck = require('testcheck');

const {invalidString} = require('./utils');
const {gen} = require('./gen');
const isValid = require('./isValid');

function plus(spec) {
    return {
        conform: values => (values.length > 0 && _.every(values, value => isValid(spec, value)))
            ? values : invalidString,
        unform: _.identity,
        gen: () => testcheck.gen.bind(testcheck.gen.null, () => {
            const result = gen(spec);
            return testcheck.gen.array(result, _.random(1, 5));
        })
    };
}

module.exports = plus;
