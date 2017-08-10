// Example: Another Password Generator with Spec. Node.spec implementation
// of http://upgradingdave.com/blog/posts/2016-06-21-random-pwd-with-spec.html
// by Dave Paroulek

const s = require('../lib/spec');
const gen = require('../lib/gen');

const {isString} = s.utils;

s.def('::two-lowers',
      s.and(isString, s => s.match(/.*[a-z]+.*[a-z]+.*/)));
/*
s.isValid('::two-lowers', '1234');
s.isValid('::two-lowers', '12b34a');
*/
console.log(gen.generate(s.gen('::two-lowers')));
