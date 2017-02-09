const _ = require('lodash');

const functions = require('./functions');

const testcheck = require('testcheck');

function gen(spec) {
    if (_.isFunction(spec)) {
        return functions.gen(spec);
    } else {
        return null;
    }
}

function generate(generator) {
    return sample(generator, 1)[0];
}

function sample(generator, n = 10) {
    const sample = testcheck.sample(generator);
    return n < 10 ? _.slice(sample, 0, n + 1) : sample;
}

module.exports = {
    gen,
    generate,
    sample
};
