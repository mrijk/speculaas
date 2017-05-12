const _ = require('lodash');

function describe(predicates) {
    return _.map(predicates, p => {
        if (_.isFunction(p))
            return p.name;
        else
            return p;
    });
}

module.exports = describe;
