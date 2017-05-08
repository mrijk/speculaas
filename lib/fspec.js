const _ = require('lodash');

const exercise = require('./exercise');
const isValid = require('./isValid');
const {invalidString, isFunction} = require('./utils');

function fspec(options) {
    const {args, ret, fn} = options;
    return {
        args,
        ret,
        fn,
        conform: f => {
            if (isFunction(f)) {
                const samples = exercise(args, 10);

                const validReturnValue = ([, returnValue]) => isValid(ret, returnValue);
                const results = _.map(samples, ([args]) => [args, f(...args)]);
                const pass = _.every(results, sample => validReturnValue(sample));
                
                return pass ? f : invalidString;               
            } else {
                return invalidString;
            }
        }
    }
}

module.exports = fspec;
