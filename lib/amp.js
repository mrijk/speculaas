const _ = require('lodash');

const {conform, invalidString} = require('./conform');

const {gen} = require('./gen');

function amp(re, ...preds) {
    return {
        conform: value => {
            const result = conform(re, value);
            return result !== invalidString && _.every(preds, p => p(result)) ? result : null;
        },
        gen: () => gen(re)
    };
}

module.exports = amp;
