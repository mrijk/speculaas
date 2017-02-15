const _ = require('lodash');

const testcheck = require('testcheck');

const {getSpec} = require('./def');
const {gen} = require('./gen');
const isValid = require('./isValid');

function question(spec) {
    const predicate = getSpec(spec);

    return {
        conform: values => (values.length === 0 || (values.length === 1 && isValid(predicate, values[0]))) ? values : null,
        gen: () => testcheck.gen.bind(testcheck.gen.null, () => {
            const result = gen(spec);
            return testcheck.gen.array(result, _.random(1));
        })
    };
}

module.exports = question;

