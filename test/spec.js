'use strict';

const {expect} = require('chai');

const {isOdd, isInteger, isString, invalidString} = require('./utils');

describe('Test node.spec functions', function() {
    const s = require('../spec');

    const suit = [':club', ':diamond', ':heart', ':spade'];

    describe('Test the define function', () => {
        it('should allow an array as predicate', () => {
            s.def('::suit', suit);
            expect(s.isValid('::suit', ':club')).to.be.true;
        });
    });

    describe('Test the conform function', () => {
        s.def('::a', isInteger);

        it('should return value when value is conform spec', () => {
            expect(s.conform('::a', 12)).to.equal(12);
        });
        
        it('should return invalid string', () => {
            expect(s.conform('::a', 'foobar')).to.equal(invalidString);
        });
    });

    describe('Test the alt function', () => {
    });

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
            expect(s.isValid(suit, ':club')).to.be.true;
            expect(s.isValid(suit, 42)).to.be.false;
        });
    });

    describe('Test the nilable function', () => {
        it('should create a spec that allows null as a valid value', () => {
            expect(s.isValid(isString, null)).to.be.false;
            expect(s.isValid(s.nilable(isString), null)).to.be.true;            
        });
    });

    describe('Test the getSpec function', () => {
        it('should return an existing spec', () => {
            s.def('::odd?', s.and(isInteger, isOdd));
            expect(s.getSpec('::odd?')).to.exist;
        });

        it('should return null on an non-existing spec', () => {
            expect(s.getSpec('::foobar?')).to.be.undefined;
        });
    });
});
