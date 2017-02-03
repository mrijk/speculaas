const _ = require('lodash');

const {conform, invalidString} = require('./conform');

function amp(re, ...preds) {
    return {
        conform: value => {
            const result = conform(re, value);
            return result !== invalidString && _.every(preds, p => p(result)) ? result : null;
        }
    };
}

module.exports = amp;
