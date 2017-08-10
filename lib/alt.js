const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');
const {firstProblem} = require('./explainData');
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
            yield* explainLength(predicates, value, via);
            yield* explainInvalid(value, pairs, via);
        }
    };
}

function* explainLength(predicates, value, via) {
    if (_.isEmpty(value)) {
        yield {
            path: [],
            reason: 'Insufficient input',
            pred: ['alt', ...describe(predicates)],
            val: value,
            via,
            'in': []
        };
    }
}

function* explainInvalid([value], pairs, via) {
    if (!value) return;

    const found = _.find(pairs, ([, predicate]) => isValid(predicate, value));
    if (found === undefined) {
        for (let [label, predicate] of pairs) {
            yield* firstProblem(predicate, value, {via, path: [label], _in: [0]});
        }
    }
}

module.exports = alt;
