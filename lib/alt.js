const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');
const {gen} = require('./gen');
const isValid = require('./isValid');

const describe = require('./util/describe');

function alt(...predicates) {
    const pairs = _.chunk(predicates, 2);
    
    return {
        op: 'alt',
        conform: ([value]) => {
            const found = _.find(pairs, ([, predicate]) => isValid(predicate, value));
            return _.isUndefined(found) ? invalidString : [found[0], value];
        },
        gen: () => tcg.null.then(() => {
            const result = gen(_.sample(pairs)[1]);
            return tcg.array(result, {size: 1});
        }),
        describe: () => [alt.name, ...describe(predicates)],
        explain: function*(value, {via}) {
        }
    };
}

module.exports = alt;
