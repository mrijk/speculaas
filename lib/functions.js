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
        return null; // ??
    } else {
        return null;
    }
}

module.exports = {
    gen
};
