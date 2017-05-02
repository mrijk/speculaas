const _ = require('lodash');

const {getSpec, spec: specize} = require('./def');
const functions = require('./functions');
const isValid = require('./isValid');

const testcheck = require('testcheck');

const maxAttempts = 100;

function gen(p) {
    return specize(p).gen();
}

function generate(generator) {
    return sample(generator, 1).next().value;
}

function* sampleFromSpec(spec, n = 10) {
    let failedAttempts = 0;
    
    for (let s of sampleInf(gen(spec))) {
        if (n === 0) {
            break;
        } else if (isValid(spec, s)) {
            failedAttempts = 0;
            n--;
            yield s;
        } else {
            if (++failedAttempts === maxAttempts) {
                throw new Error(`sampleFromSpec failed at ${failedAttempts} attempts`);
            }
        }
    }
}

function* sample(generator, n = 10) {
    for (let s of sampleInf(generator)) {
        if (n === 0) {
            break;
        } else {
            n--;
            yield s;
        }
    }
}

function* sampleInf(generator) {
    for (const sample of testcheck.sample(generator)) {
        yield sample;
    }
    yield* sampleInf(generator);
}

module.exports = {
    gen,
    generate,
    sample,
    sampleFromSpec
};
