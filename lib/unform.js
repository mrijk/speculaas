const _ = require('lodash');

const {getSpec} = require('./def');

function unform(spec, value) {    
    if (_.isFunction(spec)) {
        return value;
    } else {        
        const predicate = getSpec(spec).unform;
        return predicate ? predicate(value) : value;
    }
}

module.exports = unform;
