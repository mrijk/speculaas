const _ = require('lodash');

const {conform, invalidString} = require('./conform');
const describe = require('./describe');
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
        describe: () => [amp.name, describe(re), describePreds(preds)]
    };
}

module.exports = amp;
