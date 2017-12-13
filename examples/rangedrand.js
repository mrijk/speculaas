// Example: spec'ing functions

const s = require('../lib/spec');
const stest = require('../lib/test');

const {isInt, isString} = s.utils;

// Returns random int in range start <= rand < end

function rangedRand(start, end) {
    return start + (end - start) * Math.random() | 0;
}

// We can then provide a specification for that function

s.fdef(rangedRand, {
    args: s.and(s.cat('start', isInt, 'end', isInt),
                args => args.start < args.end),
    ret: isInt,
    fn: s.and(f => f.ret >= f.start,
              f => f.ret < f.end)
});

console.log(stest.check(rangedRand));
