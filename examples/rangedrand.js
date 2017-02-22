// Example: spec'ing functions

const _ = require('lodash');

const s = require('../lib/spec');
const stest = require('../lib/test');

const {isInt, isString} = require('../test/utils');

// Returns random int in range start <= rand < end

function rangedRand(start, end) {
    return start + (end - start) * Math.random() | 0;
}

// We can then provide a specification for that function

s.fdef(rangedRand, {
    args: s.and(s.cat('start', isInt, 'end', isInt),
                args => args.start < args.end),
    ret: isString,
    fn: s.and(x => x.ret >= x.start,
              x => x.ret < x.end)
});

console.log(stest.check(rangedRand));
