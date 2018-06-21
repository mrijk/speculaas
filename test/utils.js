const {map, forEach, isEqual} = require('lodash');

const s = require('../lib/spec');
const stest = require('../lib/test');

function check(func, specPath) {
   const specFile = require(specPath);
    
    s.fdef(func, specFile);
    return stest.check(func);
 }

function exerciseFunc(func, specPath) {
    const specFile = require(specPath);
    
    s.fdef(func, specFile);
    
    const specs = map(s.exerciseFn(func), ([, s]) => s);
    
    forEach(specs, s.exercise);
}

function idemPotent(spec, value) {
    return isEqual(s.unform(spec, s.conform(spec, value)), value);
}

module.exports = {
    check,
    exerciseFunc,
    idemPotent
};
