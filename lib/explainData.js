const _ = require('lodash');

const {spec: specize} = require('./def');
const {isString} = require('./utils');

function explainData(spec, value, {path =  [], via = []} = {}) {
    const lookup = specize(spec);
    if (lookup) {
        const name = specName(spec);
        const viaOut = _.isUndefined(name) ? via : [name, ...via];
        return lookup.explain(value, {path, via: viaOut});
    } else {
        throw new Error(`Unable to resolve spec ${spec}`);
    }
}

function specName(spec) {
    return isString(spec) ? spec : undefined;
}

module.exports = explainData;
