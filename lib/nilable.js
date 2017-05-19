const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {conform} = require('./conform');
const {gen} = require('./gen');

const describe = require('./util/describe');

function nilable(predicate) {
    return {
        conform: value => _.isNull(value) ? null : conform(predicate, value),
        unform: _.identity,
        gen: () => tcg.null.then(() => _.random(10) < 2 ? tcg.null : gen(predicate)),
        describe: () => [nilable.name, ...describe([predicate])],
        explain: (value, {via}) => {
            return null;
        }
    };
}

module.exports = nilable;
