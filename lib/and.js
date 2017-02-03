const _ = require('lodash');

const isValid = require('./isValid');

function and(...predicates) {
    return {
        conform: value => _.every(predicates, predicate => isValid(predicate, value)) ? value : null
    };
}

module.exports = and;
