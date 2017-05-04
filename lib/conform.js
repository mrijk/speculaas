const _ = require('lodash');

const {getSpec} = require('./def');

const {invalidString} = require('./utils');

function conform(spec, value) {
    if (_.isFunction(spec)) {
        const result = spec(value);
        return result ? value : invalidString;
    } else {
        const predicate = getSpec(spec).conform;
        
        return predicate(value);
    }
}

module.exports = {
    conform,
    invalidString
};

