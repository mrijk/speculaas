const {spec: specize} = require('./def');

const {invalidString} = require('./utils');

function conform(spec, x) {
    const lookup = specize(spec);
    if (lookup) {
        return lookup.conform(x);
    } else {
        throw new Error(`Unable to resolve spec ${spec}`);
    }
}

module.exports = {
    conform,
    invalidString
};

