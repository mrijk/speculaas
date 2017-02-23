const _ = require('lodash');

const {conform} = require('../conform');
const exerciseFn = require('../exerciseFn');
const fdef = require('../fdef');
const isValid = require('../isValid');

function check(sym, opts = {}) {
    const alwaysTrue = () => true;
    const {args: argsSpec, ret: returnSpec = alwaysTrue, fn: funcSpec = alwaysTrue} = fdef.specs(sym);
    
    const samples = exerciseFn(sym);
    
    const validReturnValue = ([, returnValue]) => isValid(returnSpec, returnValue);
    const validateFunction = ([args, returnValue]) => funcSpec({ret: returnValue, args: conform(argsSpec, args)});

    const pass = _.every(samples, sample => validReturnValue(sample) && validateFunction(sample));

    return {
        spec: {},
        sym: sym.name,
        result: pass,
        type: ':pass'
    };
}

module.exports = check;
