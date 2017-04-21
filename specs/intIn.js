const s = require('../lib/spec');

const {isInteger} = s.utils;

module.exports = {
    args: s.cat(':start', isInteger, ':end', isInteger),
    ret: s.isSpec
};
