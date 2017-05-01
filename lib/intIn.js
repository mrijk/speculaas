const _ = require('lodash');

const {gen: tcg} = require('testcheck');

function intIn(start, end) {
    return {
        conform: value => isIntInRange(start, end, value),
        unform: _.identity,
        gen: () => tcg.intWithin(start, end - 1)
    };
}

function isIntInRange(start, end, val) {
    return end > start && _.inRange(val, start, end);
}

module.exports = {
    intIn,
    isIntInRange
};
