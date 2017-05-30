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
    const val = getValue(value);

    const result = _.transform(val, (result, v, k) => {
        const kexpl = explainData(kpred, k, {via});
        const vexpl = explainData(vpred, v, {via});
        result.push(kexpl ? kexpl.problems[0] : null);
        result.push(vexpl ? vexpl.problems[0] : null);
    }, []);

    for (let p of result) {
        if (p)
            yield p;
    }
}
                         
function getValue(value) {
    return _.isMap(value) ? _.fromPairs([...value]) : value;
}

module.exports = mapOf;
