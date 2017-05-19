const {spec: specize} = require('./def');

function explainData(spec, value) {
    const lookup = specize(spec);
    if (lookup) {
        return lookup.explain(value);
    } else {
        throw new Error(`Unable to resolve spec ${spec}`);
    }
}

module.exports = explainData;
