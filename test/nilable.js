const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {isNull, isString, invalidString, unknownString} = s.utils;

const {check, exerciseFunc} = require('./utils');

describe('Test the nilable function', () => {
    before(() => {
        s.def('::nilable', s.nilable(isString));
    });
    
    it('should create a spec that allows null as a valid value', () => {
        expect(s.isValid(isString, null)).to.be.false;
        expect(s.isValid(s.nilable(isString), null)).to.be.true;            
    });

    describe('should handle valid input', () => {
        it('should create a named spec that allows null as a valid value', () => {
            s.def('::string?', isString);
            expect(s.isValid(s.nilable('::string?'), 'foobar')).to.be.true;
            expect(s.isValid(s.nilable('::string?'), null)).to.be.true;
        });
        
        it('should test conform', () => {
            expect(s.conform('::nilable', null)).to.be.null;
            expect(s.conform('::nilable', 'foobar')).to.equal('foobar');
        });

        it('explainData should return null', () => {
            expect(s.explainData('::nilable', null)).to.be.null;
        });
    });

    describe('should reject invalid input', () => {
        it('should return the invalid string', () => {
            expect(s.conform('::nilable', 1)).to.equal(invalidString);
        });

        it('should implement explain', () => {
            expect(s.explainData('::nilable', 1)).to.eql({
                problems: [
                    {
                        path: ['pred'],
                        pred: 'isString',
                        val: 1,
                        via: ['::nilable'],
                        'in': []
                    },
                    {
                        path: ['null'],
                        pred: 'isNull',
                        val: 1,
                        via: ['::nilable'],
                        'in': []
                    }
                ]
            });
        });
    });

    it('should test unconform', () => {
        expect(s.unform('::nilable', null)).to.be.null;
        expect(s.unform('::nilable', 'foobar')).to.equal('foobar');
    });

    it('should implement a generator', () => {
        expect(s.exercise('::nilable')).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => isNull(v) || isString(v)));
    });

    it('should implement describe', () => {
        expect(s.describe('::nilable')).to.eql(['nilable', 'isString']);
    });

    it('should use the spec to test', () => {
        expect(check(s.nilable, '../specs/nilable')).to.have.property('result').to.equal(true);
    });

    it('should exercise the nilable function', () => {
        exerciseFunc(s.nilable, '../specs/nilable');
    });
});
