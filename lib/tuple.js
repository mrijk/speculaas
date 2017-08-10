const _ = require('lodash');

const {invalidString} = require('./conform');
const {firstProblem} = require('./explainData');
const {gen} = require('./gen');
const isValid = require('./isValid');

const describe = require('./util/describe');

function tuple(...predicates) {
    return {
        conform: values => (values.length === predicates.length &&
                            _.zip(predicates, values).every(_.spread(isValid))) ? values : invalidString,
        unform: _.identity,
        gen: () => _.map(predicates, gen),
        describe: () => [tuple.name, ...describe(predicates)],
        explain: function*(values, {via}) {
            yield* explainPredicate(values, predicates, {via});
            yield* explainInvalid(values, predicates, via);
        }
    };
}

function* explainPredicate(values, predicates, options) {
    const f = new Function('', `return values => values.length === ${predicates.length}`);
    yield* firstProblem(f(), values, options);
}

function* explainInvalid(values, predicates, via) {
    if (values.length !== predicates.length) return;

    const pairs = _.zip(predicates, values);
    const isInvalid = _.negate(_.spread(isValid));
    const index = _.findIndex(pairs, isInvalid);
    if (index !== -1) {
        const [spec, val] = pairs[index];
        yield* firstProblem(spec, val, {path: [index], via, _in: [index]});
    }
}

module.exports = tuple;
