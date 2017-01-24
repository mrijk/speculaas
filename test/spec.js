'use strict';

const _ = require('lodash');

const expect = require('chai').expect;

describe('Test node.spec functions', function() {
    const s = require('../spec');

    const suit = [':club', ':diamond', ':heart', ':spade'];

    const isEven = x => !(x % 2);
    const isOdd = x => !isEven(x);
    const isInteger = _.isInteger;
    const isString = _.isString;

    const invalidString = ':node.spec/invalid';

    describe('Test the define function', () => {
        it('should allow an array as predicate', () => {
            s.def('::suit', suit);
            expect(s.isValid('::suit', ':club')).to.be.true;
        });
    });

    describe('Test the conform function', () => {
        it('should return value when value is conform spec', () => {
            s.def('::a', isInteger);
            expect(s.conform('::a', 12)).to.equal(12);
        });
        
        it('should return invalid string', () => {
            s.def('::a', isInteger);
            expect(s.conform('::a', 'foobar')).to.equal(invalidString);
        });
    });

    describe('Test the and function', () => {
        it('should test the and of 1 spec', () => {
            s.def('::integer?', s.and(isInteger));
            expect(s.isValid('::integer?', 12)).to.be.true;
            expect(s.isValid('::integer?', 'foobar')).to.be.false;
        });

        it('should test the and of 2 specs', () => {
            s.def('::even?', s.and(isInteger, isEven));
    
            expect(s.conform('::even?', 12)).to.equal(12);
            expect(s.conform('::even?', 13)).to.equal(invalidString);
        });
    });

    describe('Test the or function', () => {
        it('should test the or of 1 spec', () => {
            s.def('::integer?', s.or(isInteger));
            expect(s.isValid('::integer?', 12)).to.be.true;
            expect(s.isValid('::integer?', 'foobar')).to.be.false;
        });

        it('should test the or of 2 specs', () => {
            s.def('::name-or-id', s.or(isInteger, isString));
            expect(s.isValid('::name-or-id', 'abc')).to.be.true;
            expect(s.isValid('::name-or-id', 100)).to.be.true;
            expect(s.isValid('::name-or-id', 3.14)).to.be.false;
        });
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

    describe('Test the plus (+) function', () => {
        s.def('::odd?', s.and(isInteger, isOdd));
        const odds = s.plus('::odd?');

        it('it should return the value', () => {
            expect(s.conform(odds, [1, 3])).to.deep.equal([1, 3]);
        });

        it('it should return the invalid string when value sequence is empty', () => {
            expect(s.conform(odds, [])).to.equal(invalidString);
        });

        it('it should return the invalid string', () => {
            expect(s.conform(odds, [1, 3, 6])).to.equal(invalidString);
        });
    });

    describe('Test the star (*) function', () => {
        s.def('::odd?', s.and(isInteger, isOdd));
        const odds = s.star('::odd?');

        it('it should return the value', () => {
            expect(s.conform(odds, [1, 3])).to.deep.equal([1, 3]);
        });

        it('it should return the invalid string when value sequence is empty', () => {
            expect(s.conform(odds, [])).to.deep.equal([]);
        });
    });
});