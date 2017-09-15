const s = require('../lib/spec');
const isPred = require('./pred');

const {isString} = s.utils;

module.exports = {
    args: s.star(s.tuple(isString, isPred)),
    ret: s.isRegex
};
