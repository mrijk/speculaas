const isValid = require('./isValid');

function nilable(predicate) {
    return {
        conform: value => (value !== null) ? isValid(predicate, value) : true
    };
}

module.exports = nilable;
