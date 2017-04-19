const s = require('../lib/spec');

function idemPotent(spec, value) {
    return s.unform(spec, s.conform(spec, value)) === value;
}

module.exports = {
    idemPotent
};
