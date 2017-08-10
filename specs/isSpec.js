const _ = require('lodash');

const s = require('../lib/spec');
const isPred = require('./pred');

const {isNull} = s.utils;

module.exports = {
    args: s.cat('x', isPred),
    ret: s.or(':null?', isNull, ':other', () => true),
    fn: ({args, ret}) => isNull(ret) || _.isEqual(ret, args.x)
};
