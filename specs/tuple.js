const s = require('../lib/spec');
const testcheck = require('testcheck');

const {isInteger} = s.utils;

const gen = () => testcheck.gen.return(isInteger);

const isPred = s.withGen(s.or(f => f === isInteger), gen);

module.exports = {
    args: s.plus(isPred),
    ret: s.isSpec
};
