const testcheck = require('testcheck');
const tcg = testcheck.gen;

function gen(fn) {
    if (fn.name === 'isInteger') {
        return tcg.int;
    } else if (fn.name === 'isString') {
        return tcg.string;
    } else if (fn.name === 'isBoolean') {
        return tcg.boolean;
    } else if (fn.name === 'isDouble') {
        return tcg.bind(tcg.null, () => tcg.return(getRandomDouble()));
    } else {
        return null;
    }
}

function getRandomDouble() {
    // TODO: also generate some -inf, +inf, NaN once in a while
    const min = -10.0;
    const max = 10.0;
    return min + Math.random() * (max - min);
}

module.exports = {
    gen
};
