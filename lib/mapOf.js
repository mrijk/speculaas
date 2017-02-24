const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

const {gen, generate, sample} = require('./gen');
const {checkCount} = require('./helper');

function mapOf(kpred, vpred, options = {}) {
    const {conformKeys = false} = options;

    return {
        conform: value => checkCount(value, options) && _.every(value, (v, k) => vpred(v) && kpred(k)),
        gen: () => {
            const count = options.count || 10;
            const keyGen = gen(kpred);
            const valueGen = gen(vpred);

            return tcg.map(([k, v]) => ({[k]: v}), tcg.array([keyGen, valueGen]));
        }
    };
}

module.exports = mapOf;
