const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

function gen(fn) {
    if (fn.name === 'isInteger') {
        return tcg.int;
    } else if (fn.name === 'isString') {
        return tcg.string;
    } else if (fn.name === 'isBoolean') {
        return tcg.boolean;
    } else {
        return null;
    }
}

module.exports = {
    gen
};
