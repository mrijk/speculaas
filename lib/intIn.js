const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');

function intIn(start, end) {
    return {
        conform: value => _.isInteger(value) && isIntInRange(start, end, value) ? value : invalidString,
        unform: _.identity,
        gen: () => tcg.intWithin(start, end - 1),
        describe: () => ['and', 'isInt', ['isIntInRange', start, end]],
        explain: function*(value, {via}) {
        }
    };
}

function isIntInRange(start, end, val) {
    return end > start && _.inRange(val, start, end);
}

module.exports = {
    intIn,
    isIntInRange
};
