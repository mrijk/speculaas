const s = require('../lib/spec');
const isPred = require('./pred');

module.exports = {
    args: s.cat(s.isRegex, s.star(isPred)),
    ret: s.isRegex
};
