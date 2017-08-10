const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isInteger, isOdd, invalidString} = s.utils;

describe('Test the plus (+) function', () => {
    before(() => {
        s.def('::odd?', s.and(isInteger, isOdd));
        s.def('::odds', s.plus('::odd?'))
    });

    describe('should handle valid input', () => {
        it('conform should return the value', () => {
            expect(s.conform('::odds', [1, 3])).to.eql([1, 3]);
        });

        it('explainData should return null', () => {
            expect(s.explainData('::odds', [1, 3])).to.be.null;
        });
    });

    describe('should reject empty input', () => {
        it('conform should return the invalid string when value sequence is empty', () => {
            expect(s.conform('::odds', [])).to.equal(invalidString);
        });

        it('explainData should report a problem', () => {
            expect(s.explainData('::odds', [])).to.eql({
                problems: [
                    {
                        path: [],
                        reason: 'Insufficient input',
                        val: [],
                        via: ['::odds'],
                        'in': []
                    }
                ]
            });
        });
    });
    
    describe('should reject invalid input', () => {
        it('should return the invalid string', () => {
            expect(s.conform('::odds', [1, 3, 6])).to.equal(invalidString);
        });

        it('explainData should report a problem', () => {
            expect(s.explainData('::odds', [1, 3, 6])).to.eql({
                problems: [
                    {
                        path: [],
                        pred: 'isOdd',
                        val: 6,
                        via: ['::odds'],
                        'in': [2]
                    }
                ]
            });
        });
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::odds', [1, 3, 5])).to.be.true;
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.plus(isInteger))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => _.isArray(v) && v.length > 0));
    });

    it('should implement describe', () => {
        expect(s.describe('::odds')).to.eql(['plus', '::odd?']);
    });
});

