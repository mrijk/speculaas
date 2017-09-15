const s = require('../lib/spec');
const isPred = require('./pred');

module.exports = {
    args: s.cat(':pred', isPred),
    ret: s.isRegex
};
