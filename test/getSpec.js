const {expect} = require('chai');

const s = require('../lib/spec');
const {isOdd, isInteger} = s.utils;

describe('Test the getSpec function', () => {

    it('should return an existing spec', () => {
        s.def('::odd?', s.and(isInteger, isOdd));
        expect(s.getSpec('::odd?')).to.exist;
    });
    
    it('should return null on an non-existing spec', () => {
        expect(s.getSpec('::foobar?')).to.be.undefined;
    });
});
