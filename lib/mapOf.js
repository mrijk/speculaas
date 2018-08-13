const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {conform, invalidString} = require('./conform');
const {firstProblem} = require('./explainData');
const {gen} = require('./gen');
const {checkCount} = require('./util/helper');

const describe = require('./util/describe');

function mapOf(kpred, vpred, options = {}) {
    return {
        conform: _.partial(_conform, kpred, vpred, options),
        unform: _.identity,
        gen: () => tcg.object(gen(kpred), gen(vpred)),
        describe: () => [mapOf.name, ...describe([kpred, vpred])],
        explain: function*(value, {via}) {
            yield* explainInvalid(value, kpred, vpred, via);
        }
    };
}

function _conform(kpred, vpred, options, value) {
    const val = getValue(value);

    if (checkCount(val, options)) {
        const {conformKeys = false} = options;
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
}

function* explainInvalid(value, kpred, vpred, via) {
    for (let val of getValue(value)) {
        yield* explainPredicate(kpred, val, via, 0);
        yield* explainPredicate(vpred, val, via, 1);
    }
}

function* explainPredicate(pred, val, via, index) {
    yield* firstProblem(pred, val[index], {via, _in: val, path: [index]});
}

function getValue(value) {
    return _.isMap(value) ? Array.from(value) : _.toPairs(value);
}

module.exports = mapOf;
