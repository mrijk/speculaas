const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');

function instIn(start, end) {
    return {
        conform: value => isInstInRange(start, end, value) ? value : invalidString,
        unform: _.identity,
        gen: () => tcg.intWithin(start.getTime(), end.getTime() - 1).then(t => new Date(t)),
        describe: () => ['and', 'isInst', ['isInstInRange', start, end]],
        explain: function*(value, {via}) {
            yield* explainType(value, via);
            yield* explainInvalid(value, start, end, via);
        }
    };
}

function* explainType(value, via) {
    if (!_.isDate(value)) {
        yield {
            path: [],
            pred: 'isDate',
            val: value,
            via,
            'in': []
        };
    }
}

function* explainInvalid(value, start, end, via) {
    if (_.isDate(value) && !isInstInRange(start, end, value)) {
        yield {
            path: [],
            pred: `isInstInRange(${start}, ${end}, value)`,
            val: value,
            via,
            'in': []
        };
    }
}

function isInstInRange(start, end, val) {
    return _.isDate(val) && end > start && _.inRange(val, start, end);
}

module.exports = {
    instIn,
    isInstInRange
};
