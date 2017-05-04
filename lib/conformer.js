const _ = require('lodash');

const {invalidString} = require('./utils');
const functions = require('./functions');

function conformer(f, unf = _.identity) {
    return {
        conform: value => f(value) ? value : invalidString,
        unform: unf,
        gen: () => functions.gen(f)
    };
}

module.exports = conformer;
