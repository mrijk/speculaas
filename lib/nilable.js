const _ = require('lodash');

const isValid = require('./isValid');

const {gen: tcg} = require('testcheck');

const {gen} = require('./gen');

function nilable(predicate) {
    return {
        conform: value => (value !== null) ? isValid(predicate, value) : true,
        gen: () => tcg.null.then(() => _.random(10) < 2 ? tcg.null: gen(predicate))
    };
}

module.exports = nilable;
