const _ = require('lodash');

const {conform, invalidString} = require('./conform');

function cat(...predicates) {
    return {
        conform: values => {
            if (values.length === predicates.length / 2) {
                return _.zip(_.chunk(predicates, 2), values).reduce(
                    (result, [[k, p], v]) => {
                        result[k] = conform(p, v);
                        return result;
                    },
                    {});
            } else {
                return false;
            }
        }
    };
}
module.exports = cat;
