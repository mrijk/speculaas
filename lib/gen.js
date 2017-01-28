const _ = require('lodash');

function generate(generator) {
    return generator.get();
}

function sample(generator, n = 10) {
    return _.times(n, _ => generate(generator));
}

module.exports = {
    generate,
    sample
};
