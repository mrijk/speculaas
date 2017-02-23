const s = require('../lib/spec');

const {isBoolean, isInteger} = require('../test/utils');

module.exports = {
    args: s.cat('start', isInteger, 'end', isInteger, 'val', isInteger),
    ret: isBoolean,
    fn: ({args: {start, end, val}, ret}) => {console.log(start, end, val, ret); return (ret && val >= start && val < end) || !ret;}
};

