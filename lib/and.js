const _ = require('lodash');

const {conform, invalidString} = require('./conform');
const {gen} = require('./gen');
const unform = require('./unform');

function and(...predicates) {
    return {
        conform: value => {
            let allValid = true;

            const results = _.reduce(predicates, (result, p) => {
                const val = conform(p, result);

                allValid = allValid && (val !== invalidString);

                return _.isObject(val) ? val : result;
            }, value);
            
            return allValid ? results : invalidString;
        },
        unform: value => unform(predicates[0], value),
        gen: () => gen(predicates[0])
    };
}

module.exports = and;
