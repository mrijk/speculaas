const _ = require('lodash');

const {gen} = require('./gen');
const isValid = require('./isValid');

function alt(...predicates) {
    const pairs = _.chunk(predicates, 2);
    
    return {
        conform: values => {
            const found = _.find(pairs, ([, predicate]) => isValid(predicate, values[0]));
            return _.isUndefined(found) ? null : [found[0], values[0]];
        },
        gen: () => {
            const sample = _.sample(pairs)[1];
            return gen(sample);
        }
    };
}

module.exports = alt;
