const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {exerciseFunc, idemPotent} = require('./utils');

const {isDouble} = s.utils;

describe('Test the doubleIn function', () => {
    before(() => {
        s.def('::percentage', s.doubleIn({min: 0.0, max: 100.0}));
    });

    describe('should handle valid input', () => {
        it('should return true if value is within range', () => {
            expect(s.isValid('::percentage', 50.1)).to.be.true;
        });

        it('should accept infinite numbers', () => {
            s.def('::inf', s.doubleIn({isInfinite: true}));
            expect(s.isValid('::inf', Infinity)).to.be.true;
        });

        it('should accept NaN', () => {
            s.def('::nan', s.doubleIn({isNaN: true}));
            expect(s.isValid('::nan', NaN)).to.be.true;
        });

        it('explainData should return null', () => {
            expect(s.explainData('::percentage', 50.1)).to.be.null;
        });
    });

    describe('should reject invalid input', () => {
        it('should return false if value is outside the range', () => {
            expect(s.isValid('::percentage', 101.0)).to.be.false;
        });

        it('explainData should report about value outside the range', () => {
            expect(s.explainData('::percentage', -1.1)).to.eql({
                problems: [
                    {
                        path: [],
                        pred: 'x => (isnan(x) && min === -Infinity) || x >= min',
                        val: -1.1,
                        via: ['::percentage'],
                        'in': []
                    }
                ]
            });
        });

        it('explainData should report about wrong type', () => {
            expect(s.explainData('::percentage', '3.14')).to.eql({
                problems: [
                    {
                        path: [],
                        pred: 'isDouble',
                        val: '3.14',
                        via: ['::percentage'],
                        'in': []
                    }
                ]
            });
        });

        it('should refuse infinite numbers', () => {
            s.def('::no-inf', s.doubleIn());
            expect(s.isValid('::no-inf', Infinity)).to.be.false;
        });

        it('should refuse NaN', () => {
            s.def('::no-nan', s.doubleIn());
            expect(s.isValid('::no-nan', 3.14)).to.be.true;
            expect(s.isValid('::no-nan', NaN)).to.be.false;
        });
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::percentage', 42.0));
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.doubleIn())).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => isDouble(v)));
    });

    it('should implement describe', () => {
        expect(s.describe('::percentage')).to.eql(['and', 'isDouble', [100], [0]]);
    });

    it('should use the spec to test', () => {
        exerciseFunc(s.doubleIn, '../specs/doubleIn');
    });
});
