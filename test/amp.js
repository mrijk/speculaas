const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isEven, isString} = s.utils;

describe('Test the amp (&) function', () => {
    before(() => {
        s.def('::even-strings', s.amp(s.star(isString), x => isEven(x.length)));
    });

    describe('should handle valid input', () => {
        it('should return true if sequence contains even number of strings', () => {
            expect(s.isValid('::even-strings', [])).to.be.true;
            expect(s.isValid('::even-strings', ['a', 'b'])).to.be.true;
        });

        it('should return even-sized array of strings', () => {
            expect(s.conform('::even-strings', ['a', 'b'])).to.eql(['a', 'b']);
        });

        it('explainData should return null', () => {
            expect(s.explainData('::even-strings', ['a', 'b'])).to.be.null;
        });
    });

    describe('should reject invalid input', () => {    
        it('should return false if sequence contains odd number of strings', () => {
            expect(s.isValid('::even-strings', ['a'])).to.be.false;
            expect(s.isValid('::even-strings', ['a', 1])).to.be.false;
            expect(s.isValid('::even-strings', ['a', 'b', 'c'])).to.be.false;
        });

        it('explainData should report about wrong type', () => {
            expect(s.explainData('::even-strings', [1])).to.eql({
                problems: [
                    {
                        path: [],
                        pred: 'isString',
                        val: 1,
                        via: ['::even-strings'],
                        'in': [0]
                    }
                ]
            });
        });

        it('explainData should report about wrong length', () => {
            expect(s.explainData('::even-strings', ['a', 'b', 'c'])).to.eql({
                problems: [
                    {
                        path: [],
                        pred: 'x => isEven(x.length)',
                        val: ['a', 'b', 'c'],
                        via: ['::even-strings'],
                        'in': []
                    }
                ]
            });
        });
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::even-strings', ['a', 'b'])).to.be.true;
    });

    it('should implement a generator', () => {
        expect(s.exercise('::even-strings')).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => isEven(v.length)));
    });

    it('should implement describe', () => {
        expect(s.describe('::even-strings')).to.eql(['amp', ['star', 'isString'],  ['x => isEven(x.length)']]);
    });
});


