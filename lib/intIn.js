const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');

function intIn(start, end) {
    return {
        conform: value => isValidType(value) && isIntInRange(start, end, value) ? value : invalidString,
        unform: _.identity,
        gen: () => tcg.intWithin(start, end - 1),
        describe: () => ['and', 'isInt', ['isIntInRange', start, end]],
        explain: function*(value, {via}) {
            yield* explainType(value, via);
            yield* explainInvalid(value, start, end, via);
        }
    };
}

function* explainType(value, via) {
    if (!isValidType(value)) {
        yield {
            path: [],
            pred: 'isInt',
            val: value,
            via,
            'in': []
        };
    }
}

function* explainInvalid(value, start, end, via) {
    if (!isIntInRange(start, end, value)) {
        yield {
            path: [],
            pred: `isIntInRange(${start}, ${end}, value)`,
            val: value,
            via,
            'in': []
        };
    }
}

function isValidType(value) {
    return _.isInteger(value);
}

function isIntInRange(start, end, val) {
    return end > start && _.inRange(val, start, end);
}

module.exports = {
    intIn,
    isIntInRange
};
