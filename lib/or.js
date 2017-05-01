const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {gen} = require('./gen');

function or(...predicates) {
    const pairs = _.chunk(predicates, 2);

    return {
        conform: value => {
            const found = _.find(pairs, ([, predicate]) => predicate(value));
            return _.isUndefined(found) ? null : [found[0], value];
        },
        unform: ([key, value]) => {
            // TODO: check if key exists
            return value;
        },
        gen: () => tcg.null.then(() => gen(_.sample(pairs)[1]))
    };
}

module.exports = or;
