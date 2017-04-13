const s = require('../lib/spec');

const {isBoolean, isInteger} = s.utils;

module.exports = {
    args: s.cat('start', isInteger, 'end', isInteger, 'val', isInteger),
    ret: isBoolean,
    fn: ({args: {start, end, val}, ret}) => (ret && val >= start && val < end) || !ret
};

