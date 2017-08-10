const _ = require('lodash');

const {expect} = require('chai');;

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isEven, isInteger, isNumber, isOdd, isString} = s.utils;

describe('Test the cat function', () => {
    before(() => {
        s.def('::ingredient', s.cat(':quantity', isNumber, ':unit', isString));
        s.def('::odds-then-maybe-even', s.cat(':odds', s.plus(isOdd), ':even', s.question(isEven)));
    });
   
    describe('should handle valid input', () => {
        it('should match a concatenation', () => {
            expect(s.isValid('::ingredient', [2, ':teaspoon'])).to.be.true;
        });

        it('should conform to a value', () => {
            expect(s.conform('::ingredient', [2, ':teaspoon'])).to.eql({':quantity': 2, ':unit': ':teaspoon'});
        });

        it('should handle nested concatenation', () => {
            s.def('::named-ingredient', s.cat(':name', isString, ':ingredient', '::ingredient'));
            expect(s.isValid('::named-ingredient', ['salt', 2, 'teaspoon'])).to.be.true;
        });
        
        it('should handle a list', () => {
            expect(s.conform('::odds-then-maybe-even', [1, 3, 5, 100])).to.eql({ ':odds': [ 1, 3, 5 ], ':even': 100 });
        });

        it('explainData should return null', () => {
            expect(s.explainData('::ingredient', [2, ':teaspoon'])).to.be.null;
        });
    });

    describe('should reject invalid input', () => {
        it('should fail if concatenation doesn\'t match', () => {
            expect(s.isValid('::ingredient', [2, 13])).to.be.false;
        });

        it('explainData should report about insufficient input', () => {
            expect(s.explainData('::ingredient', [2])).to.eql({
                problems: [
                    {
                        path: [':unit'],
                        reason: 'Insufficient input',
                        pred: 'isString',
                        val: undefined,
                        via: ['::ingredient'],
                        'in': []
                    }
                ]
            });
        });
        
        it('explainData should report about wrong type', () => {
            expect(s.explainData('::ingredient', [2, 13])).to.eql({
                problems: [
                    {
                        path: [':unit'],
                        pred: 'isString',
                        val: 13,
                        via: ['::ingredient'],
                        'in': [1]
                    }
                ]
            });
        });

        it('should fail nr of values is not correct', () => {
            expect(s.isValid('::ingredient', [2])).to.be.false;
        });
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::ingredient', [2, ':teaspoon'])).to.be.true;
    });
    
    it('should implement a generator', () => {
        s.def('::ingredient2', s.cat(':quantity', isInteger, ':unit', isString));

        expect(s.exercise('::ingredient2', 7)).to.have.length(7)
            .to.satisfy(sample => _.every(sample, ([[v1, v2]]) => isInteger(v1) || isString(v2)));
    });

    it('should implement describe', () => {
        expect(s.describe('::ingredient')).to.eql(['cat', ':quantity', 'isNumber', ':unit', 'isString']);
    });
});

