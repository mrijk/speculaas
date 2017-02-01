const _ = require('lodash');

function collOf(predicate, {kind = () => true, count, minCount, maxCount, distinct = false, into} = {}) {
    const uniq = value => !distinct || isUnique(value);
    const checkCount = ({length}) =>
          (!count || length === count) &&
          (!minCount || length >= minCount) &&
          (!maxCount || length <= maxCount);

    return value => kind(value) && uniq(value) && checkCount(value) && _.every(value, value => predicate(value));
}

function isUnique(value) {
    return _.uniq(value).length === value.length;
}

module.exports = collOf;
