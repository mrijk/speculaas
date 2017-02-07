const _ = require('lodash');

const isValid = require('./isValid');

function alt(...predicates) {
    return {
        conform: values => {
            const found = _.find(_.chunk(predicates, 2), ([, predicate]) => isValid(predicate, values[0]));
            return _.isUndefined(found) ? null : [found[0], values[0]];
        }
    };
}

module.exports = alt;
