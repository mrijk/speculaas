const {expect} = require('chai');

const s = require('../lib/spec');
const stest = require('../lib/test');

describe('Test isInstInRange function', () => {
    it('should return true if value is within range', () => {
        const start = new Date(0);
        const end = new Date('2017');
        const value = start;
        expect(s.isInstInRange(start, end, value)).to.be.true;
    });

    it('should exclude the upper bound', () => {
        const start = new Date(0);
        const end = new Date('2017');
        const value = end;
        expect(s.isInstInRange(start, end, value)).to.be.false;
    });

    it('should return false if value is outside the range', () => {
        const start = new Date('2017');
        const end = new Date('2018');
        const value = new Date('2015');
        expect(s.isInstInRange(start, end, value)).to.be.false;
    });

    it('should use the spec to test', () => {
        const instInRange = s.isInstInRange;
        const specs = require('../specs/instInRange');
        s.fdef(instInRange, specs);

        expect(stest.check(instInRange)).to.have.property('result').to.equal(true);        
    });
});
