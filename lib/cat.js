const _ = require('lodash');

const {conform, invalidString} = require('./conform');
const {gen} = require('./gen');
const unform = require('./unform');

function cat(...predicates) {
    const pairs = _.chunk(predicates, 2);

    return {
        op: 'cat',
        conform: values => {
            if (values.length === predicates.length / 2) {
                let allValid = true;
                const results = _.zip(pairs, values).reduce(
                    (result, [[k, p], v]) => {
                        result[k] = conform(p, v);
                        allValid = allValid && (result[k] !== invalidString);
                        return result;
                    },
                    {});
                return allValid ? results : invalidString;
            } else {
                return invalidString;
            }
        },
        unform: values => pairs.map(([k, p]) => unform(p, values[k])),
        gen: () => pairs.map(([, p]) => gen(p))
    };
}

module.exports = cat;
