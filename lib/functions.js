const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

function gen(fn) {
    if (fn.name === 'isInteger') {
        const max = 256 * 256 * 256 * 256;
        return {
            get: () => _.random(-max, max)
        };
    } else if (fn.name === 'isString') {
        return {
            get: () => 'foobar'
        };
    } else {
        return null;
    }
}

module.exports = {
    gen
};
