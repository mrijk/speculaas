const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./utils');
const {gen} = require('./gen');
const isValid = require('./isValid');

const describe = require('./util/describe');

function plus(spec) {
    return {
        op: 'plus',
        conform: values => (values.length > 0 && _.every(values, value => isValid(spec, value)))
            ? values : invalidString,
        unform: _.identity,
        gen: () => tcg.null.then(() => tcg.array(gen(spec), {size: _.random(1, 5)})),
        describe: () => [plus.name, ...describe([spec])]
    };
}

module.exports = plus;
