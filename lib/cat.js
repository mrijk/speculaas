const _ = require('lodash');

const {conform, invalidString} = require('./conform');

function cat(...predicates) {
    return {
        conform: values => {
            if (values.length === predicates.length / 2) {
                let allValid = true;
                const results = _.zip(_.chunk(predicates, 2), values).reduce(
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
        }
    };
}

module.exports = cat;
