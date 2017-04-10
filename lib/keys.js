const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

const {gen} = require('./gen');

const isValid = require('./isValid');

function keys({req = [], opt = []}) {
    return {
        req,
        opt,
        conform: value =>
            _.every(req, key => isValidRequiredKey(value, key)) &&
            _.every(opt, key => isValidOptionalKey(value, key)),
        gen: () => {
            return tcg.map(([k, v]) => ({[k]: v}), tcg.array(_.map(req, gen)));
        }
    };
}

function isValidOptionalKey(value, key) {
    return !_.has(value, key) || isValid(key, value[key]);
}

function isValidRequiredKey(value, key) {
    return _.has(value, key) && isValid(key, value[key]);
}

module.exports = keys;
