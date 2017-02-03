const _ = require('lodash');

const isValid = require('./isValid');

function star(spec) {
    return values => _.every(values, value => isValid(spec, value)) ? values : null;
}

module.exports = star;
