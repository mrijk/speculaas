const s = require('../lib/spec');

const {isDate} = s.utils;

module.exports = {
    args: s.cat(':start', isDate, ':end', isDate),
    ret: s.isSpec
};

