function nilable(predicate) {
    return {
        conform: value => (value !== null) ? predicate(value) : true
    };
}

module.exports = nilable;
