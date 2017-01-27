'use strict';

const expect = require('chai').expect;

const s = require('../spec');

const {isInteger, isOdd} = require('./utils');

describe('Test the star (*) function', () => {
    s.def('::odd?', s.and(isInteger, isOdd));
    const odds = s.star('::odd?');
    
    it('should return the value', () => {
        expect(s.conform(odds, [1, 3])).to.deep.equal([1, 3]);
    });
    
    it('should accept an empty value sequence', () => {
        expect(s.conform(odds, [])).to.deep.equal([]);
    });
});


