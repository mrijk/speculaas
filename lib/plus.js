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
            if (values.length === 0) {
                return {
                    problems: [
                        {
                            path: [],
                            reason: 'Insufficient input',
                            val: values,
                            via,
                            'in': []
                        }
                    ]
                };
            } else {
                const index = _.findIndex(values, value => !isValid(spec, value));
                if (index === -1) {
                    return null;
                } else {
                    const val = values[index];
                    const pred = explainData(spec, val).problems[0].pred;
                    return {
                        problems: [
                            {
                                path: [],
                                pred,
                                val,
                                via,
                                'in': [index]
                            }
                        ]
                    };
                }
            }
        }
    };
}

module.exports = plus;
