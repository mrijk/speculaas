const _ = require('lodash');

const testcheck = require('testcheck');

const {conform} = require('./conform');
const {gen, sample} = require('./gen');

function exercise(spec, n = 10) {
    const samples = sample(gen(spec), n);

    return _.map(samples, sample => [sample, conform(spec, sample)]);
}

module.exports = exercise;
