const _ = require('lodash');

function* generate(array) {
    const len = array.length;
    for (let n = 1; n <= len; n++) {
        yield [_.take(array, n), _.takeRight(array, len - n)];
    }
}

module.exports = generate;
