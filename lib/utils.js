const _ = require('lodash');

const isBoolean = _.isBoolean;
const isDate = _.isDate;
const isDouble = x => _.isNumber(x) && !_.isInteger(x);
const isEven = x => !(x % 2);
const isInteger = _.isInteger;
const isMap = _.isMap;
const isNumber = _.isNumber;
const isNull = _.isNull;
const isOdd = x => !isEven(x);
const isSet = _.isSet;
const isString = _.isString;
const isVector = _.isArray;

module.exports = {
    invalidString: ':node.spec/invalid',
    unknownString: ':node.spec/unknown',
    isBoolean,
    isDate,
    isEven,
    isOdd,
    isDouble,
    isInt: isInteger,
    isInteger,
    isMap,
    isNull,
    isNumber,
    isSet,
    isString,
    isVector
};
