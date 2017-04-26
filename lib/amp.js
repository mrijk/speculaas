const _ = require('lodash');

const {conform, invalidString} = require('./conform');

const {gen} = require('./gen');

const unform = require('./unform');

function amp(re, ...preds) {
    return {
        conform: value => {
            const result = conform(re, value);
            return result !== invalidString && _.every(preds, p => p(result)) ? result : invalidString;
        },
        unform: value => unform(re, value),
        gen: () => gen(re)
    };
}

module.exports = amp;
