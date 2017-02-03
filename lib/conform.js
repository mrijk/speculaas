const _ = require('lodash');

const {getSpec} = require('./def');

const invalidString = ':node.spec/invalid';

function conform(spec, value) {
    if (_.isFunction(spec)) {
        const result = spec(value);
        return result ? value : ':node.spec/invalid';
    } else {
        const def = getSpec(spec);
        const predicate = def.conform ? def.conform : def;
        const result = predicate(value);
        if (_.isBoolean(result)) {
            return result ? value : ':node.spec/invalid';
        } else {
            return result ? result : ':node.spec/invalid';
        }
    }
}

module.exports = {
    conform,
    invalidString
};

