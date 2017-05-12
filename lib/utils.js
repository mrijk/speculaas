const _ = require('lodash');

const isBoolean = _.isBoolean;
const isDate = d => _.isDate(d);
const isDouble = x => _.isNumber(x); //  && !_.isInteger(x);
const isEven = x => !(x % 2);
const isFunction = _.isFunction;
const isInteger = _.isInteger;
const isMap = _.isMap;
const isNumber = _.isNumber;
const isNull = _.isNull;
const isOdd = x => !isEven(x);
const isSet = _.isSet;
const isString = _.isString;
const isVector = _.isArray;

module.exports = {
    invalidString: Symbol(':node.spec/invalid'),
    unknownString: Symbol(':node.spec/unknown'),
    isBool: isBoolean,
    isBoolean,
    isDate,
    isEven,
    isFunction,
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
