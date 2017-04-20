const _ = require('lodash');

const functions = require('./functions');

function doubleIn({min = -Infinity, max = Infinity, isNaN = false, isInfinite = false} = {}) {
    const isnan = x => isNaN && _.isNaN(x);
    const checkNaN = x => isNaN || !_.isNaN(x);
    const checkInfinity = x => isnan(x) || isInfinite || _.isFinite(x);
    const checkMinValue = x => (isnan(x) && min === -Infinity) || x >= min;
    const checkMaxValue = x => (isnan(x) && max === Infinity) || x <= max;
    
    return {
        conform: value => isDouble(value) && checkInfinity(value) && checkNaN(value)
            && checkMinValue(value) && checkMaxValue(value) ? value : null,
        unform: _.identity,
        gen: () => functions.gen(isDouble)
    };
}

function isDouble(x) {
    return _.isNumber(x);
}

module.exports = doubleIn;

