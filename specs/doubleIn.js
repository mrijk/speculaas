const s = require('../lib/spec');

const {isBool, isDouble} = s.utils;

s.def('min', isDouble);
s.def('max', isDouble);
s.def('isInfinite', isBool);
s.def('isNaN', isBool);

module.exports = {
    args: s.keys({req: ['min', 'max'], opt: ['isInfinite', 'isNaN']}),
    ret: s.isSpec
};
