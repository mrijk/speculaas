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
    return [...sample(generator, 1)][0];
}

function sampleFromSpec(spec, n = 10, depth = 0) {
    if (depth > 10) {
        return [];
    }
    
    const samples = [...sample(gen(spec))];
    
    const validSamples = _.filter(samples, sample => isValid(spec, sample));
    const todo = n - validSamples.length;
    
    if (todo < 0) {
        return _.slice(validSamples, 0, n);
    } else if (todo === 0) {
        return validSamples;
    } else {
        return _.concat(validSamples, sampleFromSpec(spec, todo, ++depth));
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
    const data = testcheck.sample(generator);
    for (let i = 0; i < data.length; i++) {
        yield data[i];
    }
    yield* sampleInf(generator);
}

module.exports = {
    gen,
    generate,
    sample,
    sampleFromSpec
};
