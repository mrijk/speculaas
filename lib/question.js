const _ = require('lodash');

const {getSpec} = require('./def');
const isValid = require('./isValid');

function question(spec) {
    const predicate = getSpec(spec);

    return {
        conform: values => (values.length === 0 || (values.length === 1 && isValid(predicate, values[0]))) ? values : null
    };
}

module.exports = question;

