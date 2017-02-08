const _ = require('lodash');

const {gen} = require('./gen');

function exercise(spec, n = 10) {
    const generator = gen(spec).get;
    return _.times(n, generator);
}

module.exports = exercise;
