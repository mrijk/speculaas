const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');
const {gen} = require('./gen');

const isValid = require('./isValid');

function star(spec) {
    return {
        op: 'star',
        conform: values => _.every(values, value => isValid(spec, value)) ? values : invalidString,
        unform: _.identity,
        gen: () => tcg.null.then(() => tcg.array(gen(spec), {size: _.random(0, 5)}))
    };
}

module.exports = star;
