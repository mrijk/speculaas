const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {gen} = require('./gen');
const isValid = require('./isValid');

function alt(...predicates) {
    const pairs = _.chunk(predicates, 2);
    
    return {
        op: 'alt',
        conform: ([value]) => {
            const found = _.find(pairs, ([, predicate]) => isValid(predicate, value));
            return _.isUndefined(found) ? null : [found[0], value];
        },
        gen: () => tcg.null.then(() => {
            const result = gen(_.sample(pairs)[1]);
            return tcg.array(result, {size: 1});
        })
    };
}

module.exports = alt;
