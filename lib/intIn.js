const _ = require('lodash');

const testcheck = require('testcheck');

function intIn(start, end) {
    return {
        conform: value => isIntInRange(start, end, value),
        gen: () => testcheck.gen.intWithin(start, end - 1)
    };
}

function isIntInRange(start, end, val) {
    return _.inRange(val, start, end);
}

module.exports = {
    intIn,
    isIntInRange
};
