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
        explain: (value, {via}) => {
            return explainPredicate(values => values.length === predicates.length, value, {via});
        }
    };
}

function explainPredicate(pred, value, options) {
    return pred(value) ? null : explainData(pred, value, options);
}

module.exports = tuple;
