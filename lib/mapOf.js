const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {conform, invalidString} = require('./conform');
const {gen} = require('./gen');
const {checkCount} = require('./util/helper');

function mapOf(kpred, vpred, options = {}) {
    const {conformKeys = false} = options;

    return {
        conform: value => {
            const val = getValue(value);
            if (checkCount(val, options)) {
                let valid = true;
                const result = _.transform(val, (result, v, k) => {
                    const conformedKey = conform(kpred, k);
                    const conformedValue = conform(vpred, v);
                    valid = valid && conformedKey !== invalidString && conformedValue !== invalidString;
                    result[conformKeys ? conformedKey : k] = conformedValue;
                }, {});
                return valid ? result : invalidString;
            } else {
                return invalidString;
            }
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
