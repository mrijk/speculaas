const {spec: specize} = require('./def');

const {unknownString} = require('./utils');

function describe(spec) {
    const describe = specize(spec).describe;
    return describe ? describe() : unknownString;
}

module.exports = describe;
