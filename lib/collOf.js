const _ = require('lodash');

const {checkCount} = require('./helper');

function collOf(predicate, options = {}) {
    const {kind = () => true, distinct = false, into} = options;
    const uniq = value => !distinct || isUnique(value);

    return value => kind(value) && uniq(value) && checkCount(value, options) && _.every(value, value => predicate(value));
}

function isUnique(value) {
    return _.uniq(value).length === value.length;
}

module.exports = collOf;
