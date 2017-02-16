const _ = require('lodash');

const testcheck = require('testcheck');

const {gen} = require('./gen');
const {checkCount} = require('./helper');

function collOf(predicate, options = {}) {
    const {kind = () => true, distinct = false, into} = options;
    const uniq = value => !distinct || isUnique(value);

    return {
        conform: value => kind(value) && uniq(value) && checkCount(value, options) && _.every(value, value => predicate(value)),
        gen: () => testcheck.gen.bind(testcheck.gen.null, () => {
            const count = options.count || 10;
            const result = gen(predicate);
            return testcheck.gen.array(result, count);
        })
    };
}

function isUnique(value) {
    return _.uniq(value).length === value.length;
}

module.exports = collOf;
