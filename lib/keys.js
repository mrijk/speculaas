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
        unform: _.identity,
        gen: () => {
            // Fix me: also add opt keys!
            return tcg.object(_.zipObject(req, _.map(req, gen)));
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
