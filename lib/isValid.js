const {invalidString} = require('./conform');
const {spec: specize} = require('./def');

function isValid(spec, value) {
    return specize(spec).conform(value) !== invalidString;
}

module.exports = isValid;
