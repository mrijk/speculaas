const _ = require('lodash');

const testcheck = require('testcheck');

function instIn(start, end) {
    return {
        conform: value => isInstInRange(start, end, value),
        unform: _.identity,
        gen: () => testcheck.gen.intWithin(start.getTime(), end.getTime() - 1)
    };
}

function isInstInRange(start, end, val) {
    return _.isDate(val) && end > start && _.inRange(val, start, end);
}

module.exports = {
    instIn,
    isInstInRange
};
