const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');

function intIn(start, end) {
    return {
        conform: value => isIntInRange(start, end, value) ? value : invalidString,
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
