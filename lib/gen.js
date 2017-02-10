const _ = require('lodash');

const {getSpec} = require('./def');
const functions = require('./functions');

const testcheck = require('testcheck');

function gen(p) {
    if (_.isFunction(p)) {
        return functions.gen(p);
    } else if (_.isString(p)) {
        const spec = getSpec(p);
        return spec.gen();
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
