const {expect} = require('chai');

const s = require('../lib/spec');

const {isInteger} = s.utils;

describe('Test the conform function', () => {
    before(() => {
        s.def('::a', isInteger);
    });

    it('should return value when value is conform spec', () => {
        expect(s.conform('::a', 12)).to.equal(12);
    });

    it('should handle a predicate', () => {
        expect(s.conform(x => x > 0, 12)).to.equal(12);
    });

    it('should return invalid string', () => {
        expect(s.conform(isInteger, 12)).to.equal(12);
    });
});

 

