const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const explainData = require('./explainData');
const {gen} = require('./gen');
const isValid = require('./isValid');
const {invalidString} = require('./utils');

const describe = require('./util/describe');

function plus(spec) {
    return {
        op: 'plus',
        conform: values => (values.length > 0 && _.every(values, value => isValid(spec, value)))
            ? values : invalidString,
        unform: _.identity,
        gen: () => tcg.null.then(() => tcg.array(gen(spec), {size: _.random(1, 5)})),
        describe: () => [plus.name, ...describe([spec])],
        explain: function*(values, {via}) {
            yield* explainLength(values, via);
            yield* explainInvalid(values, spec, via);
        }
    };
}

function* explainLength(values, via) {
    if (_.isEmpty(values)) {
        yield {
            path: [],
            reason: 'Insufficient input',
            val: values,
            via,
            'in': []
        };
    }
}

function* explainInvalid(values, spec, via) {
    const index = _.findIndex(values, value => !isValid(spec, value));
    if (index !== -1) {
        const val = values[index];
        const {pred} = explainData(spec, val).problems[0];
        yield {
            path: [],
            pred,
            val,
            via,
            'in': [index]
        };
    }
}

module.exports = plus;
