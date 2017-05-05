const _ = require('lodash');

const s = require('../lib/spec');
const testcheck = require('testcheck');

const {isInteger, isString, isDate} = s.utils;

// Simple definition of a predicate
const genPred = () => testcheck.gen.oneOf([isInteger, isDate, isString, s.tuple(isInteger)]);
const isPred = s.spec(x => _.isFunction(x) || s.isSpec(x), {gen: genPred});

module.exports = {
    args: s.cat(':pred', isPred),
    ret: s.isSpec
};
