const _ = require('lodash');

const exerciseFn = require('../exerciseFn');
const fdef = require('../fdef');
const isValid = require('../isValid');

function check(sym, opts = {}) {
    const {ret: returnSpec, fn: funcSpec} = fdef.specs(sym);
    
    const samples = exerciseFn(sym);

    const validReturnValue = ([arg, returnValue]) => isValid(returnSpec, returnValue);
    
    const pass = _.every(samples, validReturnValue);

    return {
        spec: {},
        sym: sym.name,
        result: pass,
        type: ':pass'
    };
}

module.exports = check;
