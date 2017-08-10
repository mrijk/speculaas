const {expect} = require('chai');

const s = require('../lib/spec');

const {isInteger, isString} = s.utils;

describe('Test the everyKv function', () => {
    before(() => {
        s.def('::scores', s.everyKv(isString, isInteger));
    });
    
    describe('should handle valid input', () => {
        it('should return a spec for everyKv', () => {
            expect(s.isValid('::scores', {'Sally': 1000, 'Joe': 500})).to.be.true;
        }); 

        it('explainData should return null', () => {
            expect(s.explainData('::scores', {'Sally': 1000, 'Joe': 500})).to.be.null;
        });
    });

    it('should implement describe', () => {
        expect(s.describe('::scores')).to.eql(['everyKv', 'isString', 'isInteger']);
    });
});
