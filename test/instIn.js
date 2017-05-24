const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {check, exerciseFunc, idemPotent} = require('./utils');

describe('Test the instIn function', () => {
    before(() => {
        s.def('::2017', s.instIn(new Date('2017'), new Date('2018')));
    });

    describe('should handle valid input', () => {
        it('should return true if value is within range', () => {
            expect(s.isValid('::2017', new Date('2017-04-27'))).to.be.true;
        });

        it('explainData should return null', () => {
            expect(s.explainData('::2017', new Date('2017-04-27'))).to.be.null;
        });
    });

    describe('should reject invalid input', () => {
        it('should exclude the upper bound', () => {
            expect(s.isValid('::2017', new Date('2018'))).to.be.false;
        });
        
        it('should return false if value is outside the range', () => {
            expect(s.isValid('::2017', new Date('2000'))).to.be.false;
        });

        it('explainData should report about wrong type', () => {
            expect(s.explainData('::2017', '2018')).to.eql({
                problems: [
                    {
                        path: [],
                        pred: 'isDate',
                        val: '2018',
                        via: ['::2017'],
                        'in': []
                    }
                ]
            });
        });

        it('explainData should report about value outside range', () => {
            expect(s.explainData('::2017', new Date('2018'))).to.eql({
                problems: [
                    {
                        path: [],
                        pred: `isInstInRange(${new Date('2017')}, ${new Date('2018')}, value)`,
                        val: new Date('2018'),
                        via: ['::2017'],
                        'in': []
                    }
                ]
            });
        });
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::2017', new Date('2017-04-27'))).to.be.true;
    });

    it('should implement a generator', () => {
        const start = new Date('2017');
        const end = new Date('2018');
        expect(s.exercise('::2017')).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => s.isIntInRange(start, end, v)));
    });

    it('should implement describe', () => {
        const start = new Date('2017');
        const end = new Date('2018');
        expect(s.describe('::2017')).to.eql(['and', 'isInst', ['isInstInRange', start, end]]);
    });

    it('should use the spec to test', () => {
        expect(check(s.instIn, '../specs/instIn')).to.have.property('result').to.equal(true);
    });

    xit('should use the spec to test', () => {
        exerciseFunc(s.instIn, '../specs/instIn');
    });
});
