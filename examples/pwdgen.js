// Example: Another Password Generator with Spec. Node.spec implementation
// of http://upgradingdave.com/blog/posts/2016-06-21-random-pwd-with-spec.html
// by Dave Paroulek

const {size: count, range, intersection} = require('lodash');
const debug = require('debug')('pwdgen');
const testcheck = require('testcheck');

const s = require('../lib/spec');
const gen = require('../lib/gen');

const {isString} = s.utils;

// Small helper routines to implement Clojure' char and count functions
const toChar = i => String.fromCharCode(i);
// const count = _.size;

s.def('::two-lowers',
      s.and(isString, s => s.match(/.*[a-z]+.*[a-z]+.*/)));

// debug(s.isValid('::two-lowers', '1234'));
// debug(s.isValid('::two-lowers', '12b34a'));

debug(gen.generate(s.gen('::two-lowers')));

// Clojure: (def char-lower? (into #{} (map char (range 97 122))))
const isCharLower = range(97, 122).map(toChar);

s.def('::two-lowers',
      s.and(isString, s => 2 <= count(intersection(isCharLower, [...s]))));

debug(gen.generate(s.gen('::two-lowers')));

const isCharUpper = range(65, 91).map(toChar);

s.def('::two-uppers',
      s.and(isString, s => 2 <= count(intersection(isCharUpper, [...s]))));

debug(s.isValid('::two-uppers', 'AB'));

debug(gen.generate(s.gen('::two-uppers')));

const isCharDigit = range(48, 58).map(toChar);

s.def('::two-digits',
      s.and(isString, s => 2 <= count(intersection(isCharDigit, [...s]))));

s.isValid('::two-digits', '12');	// => true

debug(gen.generate(s.gen('::two-digits')));

const isCharSymbol = ['!', '$', '^', '&'];

s.def('::two-symbols',
      s.and(isString, s => 2 <= count(intersection(isCharSymbol, [...s]))));

s.isValid('::two-symbols', '$!');	// => true

debug(gen.generate(s.gen('::two-symbols')));

// TODO: original article creates a more complicated custom generator here.
const genTwoSymbols = () => testcheck.gen.asciiString;

s.def('::two-symbols',
      s.withGen(
          s.and(isString, s => 2 <= count(intersection(isCharSymbol, [...s]))),
          genTwoSymbols));

debug(gen.generate(s.gen('::two-symbols')));

s.def('::10-to-15-chars', s.and(isString, x => s.isIntInRange(10, 16, x.length)));

s.def('::password',
      s.and('::two-lowers',
            '::two-uppers',
            '::two-digits',
            '::two-symbols',
            '::10-to-15-chars'));

debug(s.isValid('::password', 'abCD12$!34'));	// => true
