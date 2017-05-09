const s = require('../lib/spec');

const {invalidString, isDate} = s.utils;

s.def('conform', s.fspec({
    args: s.cat(':value', isDate),
    ret: s.or(':value', isDate, ':invalid', x => x === invalidString)
}));

module.exports = {
    args: s.cat(':start', isDate, ':end', isDate),
    ret: s.keys({req: ['conform']})
};

