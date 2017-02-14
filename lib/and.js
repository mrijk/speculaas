const _ = require('lodash');

const {gen} = require('testcheck');

const {conform, invalidString} = require('./conform');


function and(...predicates) {
    return {
        conform: value => {
            let allValid = true;

            const results = _.reduce(predicates, (result, p) => {
                const val = conform(p, result);

                allValid = allValid && (val !== invalidString);

                return _.isObject(val) ? val : result;
            }, value);
            
            return allValid ? results : false;
        },
        gen: () => {
            // TODO: implementation
            return gen.int;
        }
    };
}

module.exports = and;
