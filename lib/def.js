const _ = require('lodash');

const defs = {};

function def(spec, predicate) {
    let entry = predicate;
    if (_.isArray(predicate)) {
        entry = value => _.includes(predicate, value);
    } else if (_.isString(predicate)) {
        // Reference to another existing spec
        entry = getSpec(predicate);
    }
    defs[spec] = entry;
}

function getSpec(spec) {
    return defs[spec];
}

module.exports = {
    def,
    getSpec
};
    
