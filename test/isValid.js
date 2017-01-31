'use strict';

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isInteger, isOdd} = require('./utils');

describe('Test the isValid function', () => {
    it('should return true when a value meets a spec', () => {
        s.def('::a', isInteger);
        expect(s.isValid('::a', 12)).to.be.true;        
    });
    
    it('should return false when a value doesn\'t meet a spec', () => {
        s.def('::a', isInteger);
        expect(s.isValid('::a', 'foobar')).to.be.false;        
    });
    
    it('should accept a function', () => {
        expect(s.isValid(isOdd, 5)).to.be.true;
    });
    
    it('should accept a lambda expression', () => {
        expect(s.isValid(x => x > 5, 0)).to.be.false;
    });
    
    it('should accept an array', () => {
        const suit = [':club', ':diamond', ':heart', ':spade'];

        expect(s.isValid(suit, ':club')).to.be.true;
        expect(s.isValid(suit, 42)).to.be.false;
    });

    it('should throw an error if spec doesn\'t exist', () => {
        expect(() => s.isValid('::foobar', 5)).to.throw(Error, /Unable to resolve spec/);
    });
});

