const {conform, invalidString} = require('./conform');

function isValid(spec, x) {
    return conform(spec, x) !== invalidString;
}

module.exports = isValid;
