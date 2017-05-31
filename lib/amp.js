const _ = require('lodash');

const {conform, invalidString} = require('./conform');
const describe = require('./describe');
const explainData = require('./explainData');
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
            yield* explainInvalid(value, re, options);
        }
    };
}

function* explainInvalid(value, re, options) {
    const expl = explainData(re, value, options);
    if (expl) {
        yield expl.problems[0];
    }
}

module.exports = amp;
