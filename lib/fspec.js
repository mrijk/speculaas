const _ = require('lodash');

const {conform} = require('./conform');
const exercise = require('./exercise');
const isValid = require('./isValid');
const {invalidString, isFunction} = require('./utils');

function fspec(options) {
    const alwaysTrue = () => true;
//    const {args: argsSpec, ret, fn: funcSpec = alwaysTrue} = options;
    const {args: argsSpec, ret, fn} = options;

    const funcSpec = fn ? fn : alwaysTrue;
    
    return {
        conform: f => {
            if (isFunction(f)) {
                // TODO: Overlap with test/check.js!!!
                const samples = exercise(argsSpec, 10);

                const validReturnValue = ([, returnValue]) => isValid(ret, returnValue);
                const validateFunction = ([args, returnValue]) => funcSpec({ret: returnValue, args: conform(argsSpec, args)});

                const results = _.map(samples, ([args]) => [args, f(...args)]);

                const pass = _.every(results, sample => validReturnValue(sample) && validateFunction(sample));

                return pass ? f : invalidString;
            } else {
                return invalidString;
            }
        }
    };
}

module.exports = fspec;
