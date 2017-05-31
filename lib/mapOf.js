const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {conform, invalidString} = require('./conform');
const explainData = require('./explainData');
const {gen} = require('./gen');
const {checkCount} = require('./util/helper');

const describe = require('./util/describe');

function mapOf(kpred, vpred, options = {}) {
    const {conformKeys = false} = options;

    return {
        conform: value => {
            const val = getValue(value);
            if (checkCount(val, options)) {
                let valid = true;

                const result = {};
                for (let [k, v] of val) {
                    const conformedKey = conform(kpred, k);
                    const conformedValue = conform(vpred, v);
                    valid = valid && conformedKey !== invalidString && conformedValue !== invalidString;
                    result[conformKeys ? conformedKey : k] = conformedValue;
                }
                
                return valid ? result : invalidString;
            } else {
                return invalidString;
            }
        },
        unform: _.identity,
        gen: () => {
            const keyGen = gen(kpred);
            const valueGen = gen(vpred);

            return tcg.object(keyGen, valueGen);
        },
        describe: () => [mapOf.name, ...describe([kpred, vpred])],
        explain: function*(value, {via}) {
            yield* explainInvalid(value, kpred, vpred, via);
        }
    };
}

function* explainInvalid(value, kpred, vpred, via) {
    for (let val of getValue(value)) {
        yield* explainPredicate(kpred, val, via, 0);
        yield* explainPredicate(vpred, val, via, 1);
    }
}

function* explainPredicate(pred, val, via, index) {
    const expl = explainData(pred, val[index], {via, _in: val, path: [index]});
    if (expl)
        yield expl.problems[0];
}

function getValue(value) {
    //    return _.isMap(value) ? _.fromPairs([...value]) : value;
    return _.isMap(value) ? Array.from(value) : _.toPairs(value);
}

module.exports = mapOf;
