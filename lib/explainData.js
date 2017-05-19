const {spec: specize} = require('./def');

function explainData(spec, value, {path =  []} = {}) {
    const lookup = specize(spec);
    if (lookup) {
        return lookup.explain(value, {path});
    } else {
        throw new Error(`Unable to resolve spec ${spec}`);
    }
}

module.exports = explainData;
