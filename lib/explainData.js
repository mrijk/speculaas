const _ = require('lodash');

const {spec: specize} = require('./def');
const {isFunction, isString} = require('./utils');

function explainData(spec, value, {path =  [], via = []} = {}) {
    const lookup = specize(spec);
    if (lookup) {
        const name = specName(spec);
        const viaOut = _.isUndefined(name) ? via : [name, ...via];
        return lookup.explain(value, {path, pred: name, via: viaOut});
    } else {
        throw new Error(`Unable to resolve spec ${spec}`);
    }
}

function specName(spec) {
    if (isString(spec)) {
        return spec;
    } else {
        return undefined;
    }
}

module.exports = explainData;
