const _ = require('lodash');

const testcheck = require('testcheck');

const {conform, invalidString} = require('./conform');
const {getSpec} = require('./def');
const {gen} = require('./gen');
const isValid = require('./isValid');

function question(spec) {
    const predicate = getSpec(spec);
    return {
        op: 'question',
        conform: values => {
            if (values.length === 0) {
                return null;
            } else if (values.length === 1) {
                return conform(predicate, values[0]);
            } else {
                return invalidString;
            }
        },
        unform: value => [value],
        gen: () => testcheck.gen.bind(testcheck.gen.null, () => {
            const result = gen(spec);
            return testcheck.gen.array(result, _.random(1));
        })
    };
}

module.exports = question;

