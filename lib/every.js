const _ = require('lodash');

const testcheck = require('testcheck');

function every(predicate, options = {}) {
    return {
        conform: value => {
            return null;
        },
        gen: () => testcheck.gen.int
    };
}

module.exports = every;
