const _ = require('lodash');

function intIn(start, end) {
    return {
        conform: value => isIntInRange(start, end, value)
    };
}

function isIntInRange(start, end, val) {
    return _.inRange(val, start, end);
}

module.exports = {
    intIn,
    isIntInRange
};
