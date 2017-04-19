const {getSpec} = require('./def');

const {unknownString} = require('./utils');

function describe(spec) {
    const describe = getSpec(spec).describe;
    return describe ? describe() : unknownString;
}

module.exports = describe;
