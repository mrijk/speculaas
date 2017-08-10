const {expect} = require('chai');

const s = require('../lib/spec');

const {check} = require('./utils');

describe('Test isIntInRange? function', () => {
    it('should return true if value is within range', () => {
        expect(s.isIntInRange(0, 13, 0)).to.be.true;
    });

    it('should exclude the upper bound', () => {
        expect(s.isIntInRange(0, 13, 13)).to.be.false;
    });

    it('should return false if value is outside the range', () => {
        expect(s.isIntInRange(0, 13, -42)).to.be.false;
    });

    it('should have an upper bound that is larger than the lower bound', () => {
        expect(s.isIntInRange(13, 0, 0)).to.be.false;
    });
    
    it('should use the spec to test', () => {
        expect(check(s.isIntInRange, '../specs/intInRange')).to.have.property('result').to.equal(true);        
    });
});
