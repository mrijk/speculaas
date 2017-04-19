const mapOf = require('./mapOf');

function everyKv(predicate, options = {}) {
    // OK for the time being
    return mapOf(predicate, options);
}

module.exports = everyKv;
