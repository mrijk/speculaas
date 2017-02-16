const _ = require('lodash');

const testcheck = require('testcheck');

const {gen} = require('./gen');
const {checkCount} = require('./helper');

function mapOf(kpred, vpred, options = {}) {
    const {conformKeys = false} = options;

    return {
        conform: value => checkCount(value, options) && _.every(value, (v, k) => vpred(v) && kpred(k)),
        gen: () => testcheck.gen.bind(testcheck.gen.null, () => {
            const count = options.count || 10;
            // const result = gen(predicate);
            return testcheck.gen.int;
        })
    };
}

module.exports = mapOf;
