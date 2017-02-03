const _ = require('lodash');

const defs = {};

function def(spec, predicate) {
    let entry = predicate;
    if (_.isArray(predicate)) {
        entry = value => _.includes(predicate, value);
    } else if (_.isString(predicate)) {
        // Reference to another existing spec
        entry = defs[predicate];
    }
    defs[spec] = entry;
}

function _getSpec(spec) {
    return defs[spec];
}

function getSpec(p) {
    if (_.isString(p)) {
        return defs[p];
    } else if (_.isObject(p)) {
        return p;
    } else {
        return null;
    }
}

module.exports = {
    def,
    getSpec
};
    
