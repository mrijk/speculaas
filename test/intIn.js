'use strict';

const {expect} = require('chai');

const s = require('../lib/spec');

describe('Test isIntInRange? function', () => {
    it('should return true if value is with range', () => {
        expect(s.isIntInRange(0, 13, 0)).to.be.true;
    });

    it('should exclude the upper bound', () => {
        expect(s.isIntInRange(0, 13, 13)).to.be.false;
    });

    it('should return false if value is outside the range', () => {
        expect(s.isIntInRange(0, 13, -42)).to.be.false;
    });
});

describe('Test the IntIn function', () => {
    s.def('::oneByte', s.intIn(0, 256));

    it('should return true if value is with range', () => {
        expect(s.isValid('::oneByte', 0)).to.be.true;
    });

    it('should exclude the upper bound', () => {
        expect(s.isValid('::oneByte', 256)).to.be.false;
    });

    it('should return false if value is outside the range', () => {
        expect(s.isValid('::oneByte', 512)).to.be.false;
    });    
});
