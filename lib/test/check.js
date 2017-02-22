const _ = require('lodash');

const exerciseFn = require('../exerciseFn');
const fdef = require('../fdef');
const isValid = require('../isValid');

function check(sym, opts = {}) {
    const returnSpec = fdef.specs(sym).ret;
    
    const samples = exerciseFn(sym);

    const pass = _.every(samples, ([arg, returnValue]) => isValid(returnSpec, returnValue));

    return {
        spec: {},
        sym: sym.name,
        result: pass,
        type: ':pass'
    };
}

module.exports = check;
