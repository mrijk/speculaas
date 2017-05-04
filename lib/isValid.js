const {invalidString} = require('./conform');
const {spec: specize} = require('./def');

function isValid(spec, x) {
    const lookup = specize(spec);
    if (lookup) {
        return lookup.conform(x) !== invalidString;
    } else {
        throw new Error(`Unable to resolve spec ${spec}`);
    }
}

module.exports = isValid;
