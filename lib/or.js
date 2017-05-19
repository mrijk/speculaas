const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');
const explainData = require('./explainData');
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
            const found = _.find(pairs, ([k]) => k === key);
            if (_.isUndefined(found)) {
                throw new Error(`Key ${key} does not exist in spec`);
            }
            return value;
        },
        gen: () => tcg.null.then(() => gen(_.sample(pairs)[1])),
        describe: () => [or.name, ...describe(predicates)],
        explain: (value, {via}) => {
            const problems = _.map(pairs, ([k, predicate]) => explainData(predicate, value, {path: [k], via}));
            return _.some(problems, _.isNull) ? null : {problems: _.flatten(_.map(problems, 'problems'))};
        }
    };
}

module.exports = or;
