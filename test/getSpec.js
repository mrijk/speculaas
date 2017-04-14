const {expect} = require('chai');

const s = require('../lib/spec');
const {isOdd, isInteger} = s.utils;

describe('Test the getSpec function', () => {

    it('should return an existing spec', () => {
        s.def('::odd?', s.and(isInteger, isOdd));
        expect(s.getSpec('::odd?')).to.exist;
    });

    it('should return undefined on an non-existing spec', () => {
        expect(s.getSpec('::foobar?')).to.be.undefined;
    });

    it('should return undefined if key of an unknown type is requested', () => {
        expect(s.getSpec([])).to.be.undefined;
    });
});
