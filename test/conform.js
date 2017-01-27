'use strict';

const {expect} = require('chai');

const s = require('../spec');

const {isInteger} = require('./utils');

describe('Test the conform function', () => {
    s.def('::a', isInteger);

    it('should return value when value is conform spec', () => {
        expect(s.conform('::a', 12)).to.equal(12);
    });

    it('should handle a predicate', () => {
        expect(s.conform('::a', 12)).to.equal(12);
    });

    it('should return invalid string', () => {
        expect(s.conform(isInteger, 12)).to.equal(12);
    });
});

 

