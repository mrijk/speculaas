const _ = require('lodash');

const {getSpec} = require('./def');

const invalidString = ':node.spec/invalid';

function conform(spec, value) {

    if (_.isFunction(spec)) {
        const result = spec(value);
        return result ? value : invalidString;
    } else {
        const predicate = getSpec(spec).conform;

        const result = predicate(value);
        
        if (_.isBoolean(result)) {
            return result ? value : invalidString;
        } else {
            return result !== null ? result : invalidString;
        }
    }
}

module.exports = {
    conform,
    invalidString
};

