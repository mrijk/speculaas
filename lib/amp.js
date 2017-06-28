const _ = require('lodash');

const {conform, invalidString} = require('./conform');
const describe = require('./describe');
const {firstProblem} = require('./explainData');
const {gen} = require('./gen');
const unform = require('./unform');

const describePreds = require('./util/describe');

function amp(re, ...preds) {
    return {
        op: 'amp',
        conform: value => {
            const result = conform(re, value);
            return result !== invalidString && _.every(preds, p => p(result)) ? result : invalidString;
        },
        unform: value => unform(re, value),
        gen: () => gen(re),
        describe: () => [amp.name, describe(re), describePreds(preds)],
        explain: function*(value, options) {
            yield* explainInvalidRegex(value, re, options);
            yield *explainInvalidPredicates(value, re, preds, options);
        }
    };
}

function* explainInvalidRegex(value, re, options) {
    yield* firstProblem(re, value, options);
}

function* explainInvalidPredicates(value, re, preds, options) {
    const result = conform(re, value);
    if (result !== invalidString) {
        for (let p of preds) {
            yield* firstProblem(p, result, options);
        }
    }
}

module.exports = amp;
