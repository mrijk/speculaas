const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {gen} = require('./gen');
const {checkCount} = require('./helper');

function mapOf(kpred, vpred, options = {}) {
    const {conformKeys = false} = options;

    return {
        conform: value => {
            const val = getValue(value);
            return checkCount(val, options) && _.every(val, (v, k) => vpred(v) && kpred(k));
        },
        unform: _.identity,
        gen: () => {
            const count = options.count || 10;
            const keyGen = gen(kpred);
            const valueGen = gen(vpred);

            return tcg.object(keyGen, valueGen);
        }
    };
}

function getValue(value) {
    return _.isMap(value) ? _.fromPairs([...value]) : value;
}

module.exports = mapOf;
