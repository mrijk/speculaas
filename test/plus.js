const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isInteger, isOdd, invalidString} = s.utils;

describe('Test the plus (+) function', () => {
    s.def('::odd?', s.and(isInteger, isOdd));
    const odds = s.plus('::odd?');
    
    it('should return the value', () => {
        expect(s.conform(odds, [1, 3])).to.eql([1, 3]);
    });
    
    it('should return the invalid string when value sequence is empty', () => {
        expect(s.conform(odds, [])).to.equal(invalidString);
    });
    
    it('should return the invalid string', () => {
        expect(s.conform(odds, [1, 3, 6])).to.equal(invalidString);
    });

    it('should unform a conformed value', () => {
        expect(idemPotent(odds, [1, 3, 5])).to.be.true;
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.plus(isInteger))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => _.isArray(v) && v.length > 0));
    });
});

