const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {conform} = require('./conform');
const {explainData} = require('./explainData');
const isValid = require('./isValid');
const {gen} = require('./gen');

const describe = require('./util/describe');

function nilable(predicate) {
    return {
        conform: value => _.isNull(value) ? null : conform(predicate, value),
        unform: _.identity,
        gen: () => tcg.null.then(() => _.random(10) < 2 ? tcg.null : gen(predicate)),
        describe: () => [nilable.name, ...describe([predicate])],
        explain: function*(value, {via}) {
            if (!(_.isNull(value) || isValid(predicate, value))) {
                yield explainData(predicate, value, {path: ['pred'], via}).problems[0];

                yield {
                    path: ['null'],
                    pred: 'isNull',
                    val: value,
                    via,
                    'in': []
                };
            }
        }
    };
}

module.exports = nilable;
