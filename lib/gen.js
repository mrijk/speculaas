const {spec: specize} = require('./def');
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
    for (const sample of retrySample(generator)) {
        yield sample;
    }
    yield* sampleInf(generator);
}

function retrySample(generator, retries = maxAttempts) {
    try {
        return testcheck.sample(generator, 10);
    } catch (err) {
        if (retries === 0) {
            throw new Error(`sampleFromSpec failed at ${maxAttempts} attempts`);
        }
        return retrySample(generator, retries - 1);
    }
}

module.exports = {
    gen,
    generate,
    sample,
    sampleFromSpec
};
