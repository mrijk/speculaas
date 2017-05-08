const s = require('../lib/spec');
const isPred = require('./pred');

module.exports = {
    args: s.plus(isPred),
    ret: s.isSpec
};
