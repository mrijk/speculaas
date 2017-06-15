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
        explain: function*(values, {via}) {
            const f = new Function('', `return values => values.length === ${predicates.length}`);
            yield* explainPredicate(f(), values, {via});
            yield* explainInvalid(values, predicates, via);
        }
    };
}

function* explainPredicate(pred, value, options) {
    if (!pred(value)) {
        yield explainData(pred, value, options).problems[0];
    }
}

function* explainInvalid(values, predicates, via) {
    if (values.length !== predicates.length) return;
    
    const index = _.findIndex(_.zip(predicates, values), ([spec, value]) => !isValid(spec, value));
    if (index !== -1) {
        const val = values[index];
        const spec = predicates[index];
        const {pred} = explainData(spec, val).problems[0];
        yield {
            path: [index],
            pred,
            val,
            via,
            'in': [index]
        };
    }
}

module.exports = tuple;
