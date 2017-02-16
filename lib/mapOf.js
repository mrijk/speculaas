const _ = require('lodash');

const {checkCount} = require('./helper');

function mapOf(kpred, vpred, options = {}) {
    const {conformKeys = false} = options;

    return {
        conform: value => checkCount(value, options) && _.every(value, (v, k) => vpred(v) && kpred(k))
    };
}

module.exports = mapOf;
