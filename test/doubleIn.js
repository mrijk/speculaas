const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');
const stest = require('../lib/test');

const {idemPotent} = require('./utils');

const {isDouble} = s.utils;

describe('Test the doubleIn function', () => {
    before(() => {
        s.def('::percentage', s.doubleIn({min: 0.0, max: 100.0}));
    });

    it('should return true if value is within range', () => {
        expect(s.isValid('::percentage', 50.1)).to.be.true;
    });

    it('should return false if value is outside the range', () => {
        expect(s.isValid('::percentage', 101.0)).to.be.false;
    });

    it('should refuse infinite numbers', () => {
        s.def('::no-inf', s.doubleIn());
        expect(s.isValid('::no-inf', Infinity)).to.be.false;
    });

    it('should accept infinite numbers', () => {
        s.def('::inf', s.doubleIn({isInfinite: true}));
        expect(s.isValid('::inf', Infinity)).to.be.true;
    });

    it('should refuse NaN', () => {
        s.def('::no-nan', s.doubleIn());
        expect(s.isValid('::no-nan', 3.14)).to.be.true;
        expect(s.isValid('::no-nan', NaN)).to.be.false;
    });

    it('should accept NaN', () => {
        s.def('::nan', s.doubleIn({isNaN: true}));
        expect(s.isValid('::nan', NaN)).to.be.true;
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::percentage', 42.0));
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.doubleIn())).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => isDouble(v)));
    });

    it('should use the spec to test', () => {
        const doubleIn = s.doubleIn;
        const specs = require('../specs/doubleIn');

        s.fdef(doubleIn, specs);

        const generatedSpecs = _.map(s.exerciseFn(doubleIn), ([, s]) => s);
 
        _.forEach(generatedSpecs, gs => s.exercise(gs));
    });
});
