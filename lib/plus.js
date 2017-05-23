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
        explain: (values, {via}) => {
            const problems = [];
            explainEmptyInput(problems, values, via);
            if (_.isEmpty(problems)) {
                explainValidInput(problems, spec, values, via);
            }
            return _.isEmpty(problems) ? null : {problems};
        }
    };
}

function explainEmptyInput(problems, values, via) {
    if (values.length === 0) {
        problems.push({
            path: [],
            reason: 'Insufficient input',
            val: values,
            via,
            'in': []
        });
    }
    return problems;
}

function explainValidInput(problems, spec, values, via) {
    const index = _.findIndex(values, value => !isValid(spec, value));
    if (index !== -1) {
        const val = values[index];
        const pred = explainData(spec, val).problems[0].pred;
        problems.push({
            path: [],
            pred,
            val,
            via,
            'in': [index]
        });    
    }
    return problems;
}

module.exports = plus;
