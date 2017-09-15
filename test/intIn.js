const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {check, exerciseFunc, idemPotent} = require('./utils');

describe('Test the IntIn function', () => {
    before(() => {
        s.def('::oneByte', s.intIn(0, 256));
    });

    describe('should handle valid input', () => {
        it('should return true if value is with range', () => {
            expect(s.isValid('::oneByte', 0)).to.be.true;
        });

        it('explainData should return null', () => {
            expect(s.explainData('::oneByte', 0)).to.be.null;
        });
    });

    describe('should reject invalid input', () => {
        it('should return always false if upper bound less than lower bound', () => {
            expect(s.isValid(s.intIn(256, 0), 0)).to.be.false;
        });
        
        it('should exclude the upper bound', () => {
            expect(s.isValid('::oneByte', 256)).to.be.false;
        });

        it('should return false if value is outside the range', () => {
            expect(s.isValid('::oneByte', 512)).to.be.false;
        });

        it('should only accept integers', () => {
            expect(s.isValid('::oneByte', 3.14)).to.be.false;
        });

        it('explainData should report about wrong type', () => {
            expect(s.explainData('::oneByte', 3.14)).to.eql({
                problems: [
                    {
                        path: [],
                        pred: 'isInt',
                        val: 3.14,
                        via: ['::oneByte'],
                        'in': []
                    }
                ]
            });
        });

        it('explainData should report about value outside range', () => {
            expect(s.explainData('::oneByte', 512)).to.eql({
                problems: [
                    {
                        path: [],
                        pred: 'isIntInRange(0, 256, value)',
                        val: 512,
                        via: ['::oneByte'],
                        'in': []
                    }
                ]
            });
        });
    });
    
    it('should unform a conformed value', () => {
        expect(idemPotent('::oneByte', 13)).to.be.true;
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.intIn(0, 42))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => s.isIntInRange(0, 42, v)));
    });

    it('should implement describe', () => {
        expect(s.describe('::oneByte')).to.eql(['and', 'isInt', ['isIntInRange', 0, 256]]);
    });

    it('should use the spec to test', () => {
        expect(check(s.intIn, '../specs/intIn')).to.have.property('result').to.equal(true);        
    });

    xit('should use the spec to test', () => {
        exerciseFunc(s.intIn, '../specs/intIn');
    });
});
