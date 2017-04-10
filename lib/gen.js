const _ = require('lodash');

const {getSpec} = require('./def');
const functions = require('./functions');
const isValid = require('./isValid');

const testcheck = require('testcheck');

function gen(p) {
    if (_.isFunction(p)) {
        return functions.gen(p);
    } else if (_.isString(p)) {
        const spec = getSpec(p);
        return spec.gen();
    } else {
        return p.gen();
    }
}

function generate(generator) {
    return sample(generator, 1).next().value;
}

function* sampleFromSpec(spec, n = 10) {
    for (let s of sampleInf(gen(spec))) {
        if (n === 0) {
            break;
        } else if (isValid(spec, s)) {
            n--;
            yield s;
        } else {
            // Count samples that didn't fullfil predicate
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
