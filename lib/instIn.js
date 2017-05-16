const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');

function instIn(start, end) {
    return {
        conform: value => isInstInRange(start, end, value) ? value : invalidString,
        unform: _.identity,
        gen: () => tcg.intWithin(start.getTime(), end.getTime() - 1).then(t => new Date(t)),
        describe: () => ['and', 'isInst', ['isInstInRange', start, end]]
    };
}

function isInstInRange(start, end, val) {
    return _.isDate(val) && end > start && _.inRange(val, start, end);
}

module.exports = {
    instIn,
    isInstInRange
};
