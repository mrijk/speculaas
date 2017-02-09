const _ = require('lodash');

const testcheck = require('testcheck');

const {gen} = require('./gen');

function exercise(spec, n = 10) {
    const generator = gen(spec);
    return testcheck.sample(generator, n);
}

module.exports = exercise;
