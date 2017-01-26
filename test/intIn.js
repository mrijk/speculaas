'use strict';

const expect = require('chai').expect;

const s = require('../spec');

const {} = require('./utils');

describe('Test the IntIn and isIntInRange? functions', () => {
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
