const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');
const {gen} = require('./gen');

const describe = require('./util/describe');

function or(...predicates) {
    const pairs = _.chunk(predicates, 2);

    return {
        conform: value => {
            const found = _.find(pairs, ([, predicate]) => predicate(value));
            return _.isUndefined(found) ? invalidString : [found[0], value];
        },
        unform: ([key, value]) => {
            // TODO: check if key exists
            return value;
        },
        gen: () => tcg.null.then(() => gen(_.sample(pairs)[1])),
        describe: () => [or.name, ...describe(predicates)]
    };
}

module.exports = or;
