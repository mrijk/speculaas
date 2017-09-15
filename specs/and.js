const s = require('../lib/spec');
const isPred = require('./pred');

module.exports = {
    args: s.star(isPred),
    ret: s.isSpec
};
