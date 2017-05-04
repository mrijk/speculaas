const _ = require('lodash');

const functions = require('./functions');

function conformer(f, unf = _.identity) {
    return {
        conform: f,
        unform: unf,
        gen: () => functions.gen(f)
    };
}

module.exports = conformer;
