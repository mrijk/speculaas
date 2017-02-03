const _ = require('lodash');

function doubleIn({min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY, isNaN = false, isInfinite = false} = {}) {
    const checkInfinity = x => isInfinite || _.isFinite(x);
    const checkNaN = x => isNaN || !_.isNaN(x);
    
    return {
        conform: value => isDouble(value) && checkInfinity(value) && checkNaN(value) && value >= min && value <= max ? value : null
    };
}

function isDouble(x) {
    return _.isNumber(x) && !Number.isInteger(x);
}

module.exports = doubleIn;

