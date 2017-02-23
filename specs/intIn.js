const s = require('../lib/spec');

const {isInteger} = require('../test/utils');

module.exports = {
    args: s.cat(':start', isInteger, ':end', isInteger)
};

