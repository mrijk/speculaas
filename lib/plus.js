const _ = require('lodash');

const isValid = require('./isValid');

function plus(spec) {
    return values => (values.length > 0 && _.every(values, value => isValid(spec, value))) ? values : null;
}

module.exports = plus;
