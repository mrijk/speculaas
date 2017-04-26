const _ = require('lodash');

const s = require('../lib/spec');

function idemPotent(spec, value) {
    return _.isEqual(s.unform(spec, s.conform(spec, value)), value);
}

module.exports = {
    idemPotent
};
