const _ = require('lodash');

const functions = require('./functions');

function gen(spec) {
    if (_.isFunction(spec)) {
        return functions.gen(spec);
    } else {
        return null;
    }
}

function generate(generator) {
    return generator.get();
}

function sample(generator, n = 10) {
    return _.times(n, () => generate(generator));
}

module.exports = {
    gen,
    generate,
    sample
};
