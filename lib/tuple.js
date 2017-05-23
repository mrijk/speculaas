const _ = require('lodash');

const {invalidString} = require('./conform');
const explainData = require('./explainData');
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
        explain: function*(value, {via}) {
            const f = new Function('values', `return values.length === ${predicates.length}`);
            yield* explainPredicate(f, value, {via});
        }
    };
}

function* explainPredicate(pred, value, options) {
    if (!pred(value)) {
        yield explainData(pred, value, options).problems[0];
    }
}

module.exports = tuple;
