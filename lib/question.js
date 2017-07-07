const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {conform, invalidString} = require('./conform');
const {firstProblem} = require('./explainData');
const {gen} = require('./gen');

const describe = require('./util/describe');

function question(spec) {
    return {
        op: 'question',
        conform: values => {
            if (values.length === 0) {
                return null;
            } else if (values.length === 1) {
                return conform(spec, values[0]);
            } else {
                return invalidString;
            }
        },
        unform: value => [value],
        gen: () => tcg.null.then(() => tcg.array(gen(spec), {size: _.random(1)})),
        describe: () => [question.name, ...describe([spec])],
        explain: function*(values, {via}) {
            yield* explainLength(values, via);
            yield* explainInvalid(values, spec, via);
        }
    };
}

function* explainLength(values, via) {
    if (values.length > 1) {
        const [, ...extra] = values;
        yield {
            path: [],
            reason: 'Extra input',
            pred: 'isInt',
            val: extra,
            via,
            'in': [1]
        };
    }
}

function* explainInvalid([val], spec, via) {
    if (val) {
        yield* firstProblem(spec, val, {via, _in: [0]});
    }
}

module.exports = question;

