// Example: Another Password Generator with Spec. Node.spec implementation
// of http://upgradingdave.com/blog/posts/2016-06-21-random-pwd-with-spec.html
// by Dave Paroulek

const _ = require('lodash');
const testcheck = require('testcheck');

const s = require('../lib/spec');
const gen = require('../lib/gen');

const {isString} = s.utils;

// Small helper routines to implement Clojure' char and count functions
const toChar = i => String.fromCharCode(i);
const count = _.size;

s.def('::two-lowers',
      s.and(isString, s => s.match(/.*[a-z]+.*[a-z]+.*/)));

// console.log(s.isValid('::two-lowers', '1234'));
// console.log(s.isValid('::two-lowers', '12b34a'));

console.log(gen.generate(s.gen('::two-lowers')));

// Clojure: (def char-lower? (into #{} (map char (range 97 122))))
const isCharLower = _.range(97, 122).map(toChar);

s.def('::two-lowers',
      s.and(isString, s => 2 <= count(_.intersection(isCharLower, [...s]))));

console.log(gen.generate(s.gen('::two-lowers')));

const isCharUpper = _.range(65, 91).map(toChar);

s.def('::two-uppers',
      s.and(isString, s => 2 <= count(_.intersection(isCharUpper, [...s]))));

console.log(s.isValid('::two-uppers', 'AB'));

console.log(gen.generate(s.gen('::two-uppers')));

const isCharDigit = _.range(48, 58).map(toChar);

s.def('::two-digits',
      s.and(isString, s => 2 <= count(_.intersection(isCharDigit, [...s]))));

s.isValid('::two-digits', '12');	// => true

console.log(gen.generate(s.gen('::two-digits')));

const isCharSymbol = ['!', '$', '^', '&'];

s.def('::two-symbols',
      s.and(isString, s => 2 <= count(_.intersection(isCharSymbol, [...s]))));

s.isValid('::two-symbols', '$!');	// => true

console.log(gen.generate(s.gen('::two-symbols')));

// TODO: original article creates a more complicated custom generator here.
const genTwoSymbols = () => testcheck.gen.asciiString;

s.def('::two-symbols',
      s.withGen(
          s.and(isString, s => 2 <= count(_.intersection(isCharSymbol, [...s]))),
          genTwoSymbols));

console.log(gen.generate(s.gen('::two-symbols')));

s.def('::10-to-15-chars', s.and(isString, x => s.isIntInRange(10, 16, x.length)));

s.def('::password',
      s.and('::two-lowers',
            '::two-uppers',
            '::two-digits',
            '::two-symbols',
            '::10-to-15-chars'));

console.log(s.isValid('::password', 'abCD12$!34'));	// => true
