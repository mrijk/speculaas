const _ = require('lodash');

const testcheck = require('testcheck');

const {conform, invalidString} = require('./conform');
const {gen, generate} = require('./gen');

function cat(...predicates) {
    const pairs = _.chunk(predicates, 2);

    return {
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
                return allValid ? results : false;
            } else {
                return false;
            }
        },
        gen: () => {
            const result = pairs.map(([, p]) => gen(p));
            return testcheck.gen.bind(testcheck.gen.null, () => testcheck.gen.array(result))
        }
    };
}

module.exports = cat;
