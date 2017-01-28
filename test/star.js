'use strict';

const {expect} = require('chai');

const s = require('../lib/spec');

const {isInteger, isOdd} = require('./utils');

describe('Test the star (*) function', () => {
    s.def('::odd?', s.and(isInteger, isOdd));
    const odds = s.star('::odd?');
    
    it('should return the value', () => {
        expect(s.conform(odds, [1, 3])).to.eql([1, 3]);
    });
    
    it('should accept an empty value sequence', () => {
        expect(s.conform(odds, [])).to.eql([]);
    });
});


