const collOf = require('./collOf');

function every(predicate, options = {}) {
    // OK for the time being
    return collOf(predicate, options);
}

module.exports = every;
