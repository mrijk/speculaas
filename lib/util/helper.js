const _ = require('lodash');

function checkCount(value, {count, minCount, maxCount} = {}) {
    const size = _.size(value);
    return (!count || size === count) &&
        (!minCount || size >= minCount) &&
        (!maxCount || size <= maxCount);
}

module.exports = {
    checkCount
};
