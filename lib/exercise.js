const _ = require('lodash');

const {conform} = require('./conform');
const {sampleFromSpec} = require('./gen');

function exercise(spec, n = 10) {
    const samples = [...sampleFromSpec(spec, n)];
    
    return _.map(samples, sample => [sample, conform(spec, sample)]);
}

module.exports = exercise;
