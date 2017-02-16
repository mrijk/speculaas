const _ = require('lodash');

const testcheck = require('testcheck');

const {gen} = require('./gen');

function or(...predicates) {
    const pairs = _.chunk(predicates, 2);

    return {
        conform: value => {
            const found = _.find(pairs, ([, predicate]) => predicate(value));
            return _.isUndefined(found) ? null : [found[0], value];
        },
        gen: () => testcheck.gen.bind(testcheck.gen.null, () => gen(_.sample(pairs)[1]))
    };
}

module.exports = or;
