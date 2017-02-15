const _ = require('lodash');

const testcheck = require('testcheck');

const {gen} = require('./gen');
const isValid = require('./isValid');

function alt(...predicates) {
    const pairs = _.chunk(predicates, 2);
    
    return {
        conform: values => {
            const found = _.find(pairs, ([, predicate]) => isValid(predicate, values[0]));
            return _.isUndefined(found) ? null : [found[0], values[0]];
        },
        gen: () => testcheck.gen.bind(testcheck.gen.null, () => {
            const result = gen(_.sample(pairs)[1]);
            return testcheck.gen.array(result, 1);
        })
    };
}

module.exports = alt;
