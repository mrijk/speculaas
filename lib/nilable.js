const _ = require('lodash');

const isValid = require('./isValid');

const testcheck = require('testcheck');

const {gen} = require('./gen');

function nilable(predicate) {
    return {
        conform: value => (value !== null) ? isValid(predicate, value) : true,
        gen: () => testcheck.gen.bind(testcheck.gen.null, () => {
            return _.random(10) < 2 ? testcheck.gen.null: gen(predicate);
        })
    };
}

module.exports = nilable;
