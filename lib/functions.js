const _ = require('lodash');

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
