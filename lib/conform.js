const {spec: specize} = require('./def');

const {invalidString} = require('./utils');

function conform(spec, x, unwrap = false) {
    const lookup = specize(spec);
    if (lookup) {
        return lookup.conform(x, unwrap);
    } else {
        throw new Error(`Unable to resolve spec ${spec}`);
    }
}

module.exports = {
    conform,
    invalidString
};
