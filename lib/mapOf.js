const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

const {gen} = require('./gen');
const {checkCount} = require('./helper');

function mapOf(kpred, vpred, options = {}) {
    const {conformKeys = false} = options;

    return {
        conform: value => {
            const val = getValue(value);
            return checkCount(val, options) && _.every(val, (v, k) => vpred(v) && kpred(k));
        },
        gen: () => {
            const count = options.count || 10;
            const keyGen = gen(kpred);
            const valueGen = gen(vpred);

            return tcg.map(([k, v]) => ({[k]: v}), tcg.array([keyGen, valueGen]));
        }
    };
}

function getValue(value) {
    if (_.isMap(value)) {
        return _.fromPairs([...value]);
    } else {
        return value;
    }
}

module.exports = mapOf;
