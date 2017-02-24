const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

const {conform, invalidString} = require('./conform');
const {gen} = require('./gen');

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
            return gen(predicates[0]);
        }
    };
}

module.exports = and;
