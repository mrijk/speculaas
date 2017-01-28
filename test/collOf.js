'use strict';

const {expect} = require('chai');

const s = require('../spec');

const {isNumber, isVector} = require('./utils');

describe('Test the collOf function', () => {
    s.def('::vnum3', s.collOf(isNumber, {kind: isVector, count: 3, distinct: true, into: {}}));
    
    it('should return a spec for a collection', () => {
        expect(s.isValid('::vnum3', [1, 2, 3])).to.be.true;
    });
    
    it('should fail on invalid type (not a vector)', () => {
        expect(s.isValid('::vnum3', {x: 1, y: 2, z: 3})).to.be.false;
    });
    
    it('should fail on non-distinct data', () => {
        expect(s.isValid('::vnum3', [1, 1, 1])).to.be.false;
    });
    
    it('should fail on invalid data', () => {
        expect(s.isValid('::vnum3', [1, 2, 'foo'])).to.be.false;
    });
    
    it('should fail on invalid length', () => {
        expect(s.isValid('::vnum3', [1, 2, 3, 4])).to.be.false;
    });

    it('should conform to a valid value',  () => {
        expect(s.conform(s.collOf(isNumber), [5, 10, 2])).to.eql([5, 10, 2]);
    });
});
