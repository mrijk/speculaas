'use strict';

const {expect} = require('chai');

const s = require('../spec');

const {isInteger, isOdd, invalidString} = require('./utils');

describe('Test the plus (+) function', () => {
    s.def('::odd?', s.and(isInteger, isOdd));
    const odds = s.plus('::odd?');
    
    it('should return the value', () => {
        expect(s.conform(odds, [1, 3])).to.deep.equal([1, 3]);
    });
    
    it('should return the invalid string when value sequence is empty', () => {
        expect(s.conform(odds, [])).to.equal(invalidString);
    });
    
    it('should return the invalid string', () => {
        expect(s.conform(odds, [1, 3, 6])).to.equal(invalidString);
    });
});

