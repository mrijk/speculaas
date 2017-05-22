const _ = require('lodash');

const s = require('../lib/spec');

function exerciseFunc(func, specPath) {
    const specFile = require(specPath);
    
    s.fdef(func, specFile);
    
    const specs = _.map(s.exerciseFn(func), ([, s]) => s);
    
    _.forEach(specs, s.exercise);
}

function idemPotent(spec, value) {
    return _.isEqual(s.unform(spec, s.conform(spec, value)), value);
}

module.exports = {
    exerciseFunc,
    idemPotent
};
