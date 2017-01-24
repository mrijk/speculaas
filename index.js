const _ = require('lodash');
const s = require('./spec');

const isEven = x => !(x % 2);
const isOdd = x => !isEven(x);
const isInteger = _.isInteger;

s.def('::even?', s.and(isInteger, isEven));
s.def('::odd?', s.and(isInteger, isOdd));
s.def('::a', isInteger);

console.log(s.explain('::even?', 13));
