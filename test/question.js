'use strict';

const expect = require('chai').expect;

const s = require('../spec');

const {isInteger, isOdd} = require('./utils');

describe('Test the question (?) function', () => {
    s.def('::odd?', s.and(isInteger, isOdd));
    const odds = s.question('::odd?');
    
    it('should return the value', () => {
        expect(s.conform(odds, [1])).to.deep.equal([1]);
    });
    
    it('should accept an empty value sequence', () => {
        expect(s.conform(odds, [])).to.deep.equal([]);
    });
    
    it('should not allow 2 or more values', () => {
        expect(s.isValid(odds, [1, 3])).to.be.false;
    });
});

