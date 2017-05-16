const _ = require('lodash');

const {isSpec} = require('../def');

function describe(predicates) {
    return _.map(predicates, p => {
        if (_.isFunction(p))
            return p.name ? p.name : p.toString();
        else if (isSpec(p))
            return p.describe();
        else
            return p;
    });
}

module.exports = describe;
