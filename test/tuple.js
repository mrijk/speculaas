const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {check, exerciseFunc, idemPotent} = require('./utils');

const {isDouble, isInteger, isString, unknownString} = s.utils;

describe('Test the tuple function', () => {
    before(() => {
        s.def('::point', s.tuple(isDouble, isDouble, isDouble));
    });
    
    describe('should handle valid input', () => {
        it('should return a spec for a tuple', () => {
            expect(s.isValid('::point', [1.5, 2.5, -0.5])).to.be.true;
        });

        it('explainData should return null', () => {
            expect(s.explainData('::point', [1.5, 2.5, -0.5])).to.be.null;
        });
    });
    
    describe('should reject invalid input', () => {
        it('should fail on invalid data', () => {
            expect(s.isValid('::point', [1.5, 2.5, 'foo'])).to.be.false;
        });
    
        it('should fail on invalid data length', () => {
            expect(s.isValid('::point', [1.5, 2.5, -0.5, 3.0])).to.be.false;
        });

        it('explainData should reject invalid length', () => {
            expect(s.explainData('::point', [1.5, 2.5])).to.eql({
                problems: [
                    {
                        path: [],
                        pred: 'values => values.length === 3',
                        val: [1.5, 2.5],
                        via: ['::point'],
                        'in': []
                    }
                ]
            });
        });

        it('explainData should reject invalid fields', () => {
            expect(s.explainData('::point', [1.5, 2.5, 'foo'])).to.eql({
                problems: [
                    {
                        path: [2],
                        pred: 'isDouble',
                        val: 'foo',
                        via: ['::point'],
                        'in': [2]
                    }
                ]
            });
        });
    });

    it('should conform a nested tuple', () => {
        s.def('::xpoint', s.tuple(isString, '::point'));
        const input = ['id', [1.5, 2.5, -0.5]];
        expect(s.conform('::xpoint', input)).to.eql(input);
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::point', [1.5, 2.5, -0.5])).to.be.true;
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.tuple(isInteger, isString))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => _.isArray(v) && v.length === 2));
    });

    it('should implement describe', () => {
        expect(s.describe('::point')).to.eql(['tuple', 'isDouble', 'isDouble', 'isDouble']);
    });

    it('should use the spec to test', () => {
        expect(check(s.tuple, '../specs/tuple')).to.have.property('result').to.equal(true);
    });

    it('should exercise the tuple function', () => {
        exerciseFunc(s.tuple, '../specs/tuple');
    });
});
