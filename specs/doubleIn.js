const s = require('../lib/spec');

const {isDouble} = s.utils;

module.exports = {
    args: s.cat(':min', isDouble, ':max', isDouble),
    ret: s.isSpec
};
