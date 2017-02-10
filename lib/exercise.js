const _ = require('lodash');

const testcheck = require('testcheck');

const {gen, sample} = require('./gen');

function exercise(spec, n = 10) {
    const generator = gen(spec);
    return sample(generator, n);
}

module.exports = exercise;
