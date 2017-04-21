const _ = require('lodash');

const {invalidString} = require('./conform');
const {getSpec} = require('./def');

function isValid(spec, value) {
    let predicate;
    if (_.isFunction(spec)) {
        predicate = spec;
    } else if (_.isArray(spec)) {
        // TODO: not correct for array of specs yet!
        predicate = value => _.includes(spec, value);
    } else {
        const def = getSpec(spec);
        if (_.isUndefined(def)) {
            throw new Error(`Unable to resolve spec ${spec}`);
        }
        predicate = def.conform;
    }    
    const result = predicate(value);

    return _.isBoolean(result) ? result : (result !== null && result !== invalidString);
}

module.exports = isValid;


