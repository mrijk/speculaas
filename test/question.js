const _ = require('lodash');

const {expect} = require('chai');;

const s = require('../lib/spec');

const {check, exerciseFunc, idemPotent} = require('./utils');

const {isInteger, isNull, isOdd, isString} = s.utils;

describe('Test the question (?) function', () => {
    s.def('::odd?', s.and(isInteger, isOdd));
    const odds = s.question('::odd?');
    
    describe('should handle valid input', () => {
        it('should return the value', () => {
            expect(s.conform(odds, [1])).to.equal(1);
        });
        
        it('should accept an empty value sequence', () => {
            expect(s.conform(odds, [])).to.be.null;
        });

        it('explainData should return null', () => {
            expect(s.explainData(odds, [])).to.be.null;
        });
    });

    describe('should reject invalid input', () => {    
        it('should not allow 2 or more values', () => {
            expect(s.isValid(odds, [1, 3])).to.be.false;
        });

        it('explainData should report about wrong type', () => {
            expect(s.explainData(odds, [1, 2, 3])).to.eql({
                problems: [
                    {
                        path: [],
                        reason: 'Extra input',
                        pred: 'isInt',
                        val: [2, 3],
                        via: [],
                        'in': [1]
                    }
                ]
            });
        });

        it('explainData should report about wrong value', () => {
            expect(s.explainData(s.question(isInteger), [true])).to.eql({
                problems: [
                    {
                        path: [],
                        pred: 'isInteger',
                        val: true,
                        via: [],
                        'in': [0]
                    }
                ]
            });
        });
    });

    it('should unform a conformed value', () => {
        expect(idemPotent(odds, [1])).to.be.true;
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.question(isString))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([[v]]) => _.isUndefined(v) || isString(v)));
    });

    it('should implement describe', () => {
        const q = s.question(isOdd);
        expect(s.describe(q)).to.eql(['question', 'isOdd']);
    });

    it('should use the spec to test', () => {
        expect(check(s.question, '../specs/question')).to.have.property('result').to.equal(true);
    });

    it('should exercise the question function', () => {
        exerciseFunc(s.question, '../specs/question');
    });
});
