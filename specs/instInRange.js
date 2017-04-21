const s = require('../lib/spec');

const {isBoolean, isDate} = s.utils;

module.exports = {
    args: s.cat('start', isDate, 'end', isDate, 'val', isDate),
    ret: isBoolean,
    fn: ({args: {start, end, val}, ret}) => (ret && val >= start && val < end) || !ret
};

