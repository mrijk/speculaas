const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {exerciseFunc, idemPotent} = require('./utils');

const {invalidString, isBoolean, isInteger, isOdd, isString} = s.utils;

describe('Test the star (*) function', () => {
    before(() => {
        s.def('::odd?', s.and(isInteger, isOdd));
        s.def('::odds', s.plus('::odd?'))
    });

    const odds = s.star('::odd?');

    describe('should handle valid input', () => {
        it('should return the value', () => {
            expect(s.conform(odds, [1, 3])).to.eql([1, 3]);
        });

        it('should accept an empty value sequence', () => {
            expect(s.conform(odds, [])).to.eql([]);
        });

        it('explainData should return null', () => {
            expect(s.explainData(odds, [])).to.be.null;
        });
    });

    describe('should reject invalid input', () => {
        it('conform should return the invalid string when sequence contains invalid data', () => {
            expect(s.conform(odds, [2])).to.equal(invalidString);
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
        expect(idemPotent(odds, [])).to.be.true;
    });

    it('should accept sequence', () => {
        s.def('::opts', s.star(s.cat(':opt', isString, ':val', isBoolean)));
        expect(s.conform('::opts', [':silent?', false, ':verbose', true])).to.eql(
            [{':opt': ':silent?',
              ':val': false,
             },
             {':opt': ':verbose',
              ':val': true
             }]);
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.star(isInteger))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => _.isArray(v) && v.length >= 0));
    });

    it('should implement describe', () => {
        s.def('::odds', s.star(isOdd))
        expect(s.describe('::odds')).to.eql(['star', 'isOdd']);
    });

    it('should exercise the star function', () => {
        exerciseFunc(s.star, '../specs/star');
    });
});
