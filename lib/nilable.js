const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {conform} = require('./conform');
const {gen} = require('./gen');

function nilable(predicate) {
    return {
        conform: value => (value !== null) ? conform(predicate, value) : null,
        unform: _.identity,
        gen: () => tcg.null.then(() => _.random(10) < 2 ? tcg.null: gen(predicate))
    };
}

module.exports = nilable;
