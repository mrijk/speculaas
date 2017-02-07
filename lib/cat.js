const _ = require('lodash');

const isValid = require('./isValid');

function cat(...predicates) {
    return {
        conform: values => values.length === predicates.length / 2 &&
            _.zip(_.chunk(predicates, 2), values).every(([[, p], v]) => isValid(p, v))
    };
}
module.exports = cat;
