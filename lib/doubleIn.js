const _ = require('lodash');

const {invalidString} = require('./conform');
const functions = require('./functions');
const {isDouble} = require('./utils');

function doubleIn({min, max, isNaN = true, isInfinite = true} = {}) {
    const isnan = x => isNaN && _.isNaN(x);
    const checkNaN = x => isNaN || !_.isNaN(x);
    const checkInfinity = x => isnan(x) || isInfinite || _.isFinite(x);
    const checkMinValue = x =>  min === undefined || x >= min;
    const checkMaxValue = x =>  max === undefined || x <= max;

    return {
        conform: value => isDouble(value) && checkInfinity(value) && checkNaN(value)
            && checkMinValue(value) && checkMaxValue(value) ? value : invalidString,
        unform: _.identity,
        gen: () => functions.gen(isDouble),
        describe: () => ['and', 'isDouble', [max], [min]],
        explain: function*(value, {via}) {
            yield* explainType(value, via);
            yield* explainInvalid(value, checkMinValue, via);
            yield* explainInvalid(value, checkMaxValue, via);
        }
    };
}

function* explainType(value, via) {
    if (!isDouble(value)) {
        yield {
            path: [],
            pred: 'isDouble',
            val: value,
            via,
            'in': []
        };
    }
}

function* explainInvalid(value, checkValue, via) {
    if (isDouble(value) && !checkValue(value)) {
        yield {
            path: [],
            val: value,
            via,
            'in': []
        };
    }
}

module.exports = doubleIn;

