const _ = require('lodash');

const {getSpec} = require('./def');

const {invalidString} = require('./utils');

function unform(spec, value) {    
    if (_.isFunction(spec)) {
        return value;
    } else {        
        const predicate = getSpec(spec).unform;
        if (predicate) {
            const result = predicate(value);
            return result;
        } else {
            return value;
        }
    }
}

module.exports = unform;
