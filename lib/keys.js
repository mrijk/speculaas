const _ = require('lodash');

const testcheck = require('testcheck');

const isValid = require('./isValid');

function keys({req = [], opt = []}) {
    return {
        req,
        opt,
        conform: value =>
            _.every(req, key => isValidRequiredKey(value, key)) &&
            _.every(opt, key => isValidOptionalKey(value, key)),
        gen: () => testcheck.gen.int
    };
}

function isValidOptionalKey(value, key) {
    return !_.has(value, key) || isValid(key, value[key]);
}

function isValidRequiredKey(value, key) {
    return _.has(value, key) && isValid(key, value[key]);
}

module.exports = keys;
