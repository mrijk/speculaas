const {gen: tcg} = require('testcheck');

function gen(fn) {
    if (fn.name === 'isInteger') {
        return tcg.int;
    } else if (fn.name === 'isString') {
        return tcg.string;
    } else if (fn.name === 'isBoolean') {
        return tcg.boolean;
    } else if (fn.name === 'isDate') {
        return getRandomDate();
    } else if (fn.name === 'isDouble') {
        return tcg.number;
    } else {
        return null;
    }
}

function getRandomDate() {
    const now = new Date();
    return tcg.intWithin(0, now.getTime()).then(t => new Date(t));
}

module.exports = {
    gen
};
