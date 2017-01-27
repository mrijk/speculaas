'use strict';

const _ = require('lodash');

const isEven = x => !(x % 2);
const isOdd = x => !isEven(x);
const isDouble = x => _.isNumber(x) && !_.isInteger(x);
const isInteger = _.isInteger;
const isNumber = _.isNumber;
const isString = _.isString;
const isVector = _.isArray;

module.exports = {
    invalidString: ':node.spec/invalid',
    isEven,
    isOdd,
    isDouble,
    isInteger,
    isNumber,
    isString,
    isVector
};
