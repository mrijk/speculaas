const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');
const stest = require('../lib/test');

const {idemPotent} = require('./utils');

describe('Test the InstIn function', () => {
    before(() => {
        s.def('::2017', s.instIn(new Date('2017'), new Date('2018')));
    });

    it('should return true if value is within range', () => {
        expect(s.isValid('::2017', new Date('2017-04-27'))).to.be.true;
    });

    it('should exclude the upper bound', () => {
        expect(s.isValid('::2017', new Date('2018'))).to.be.false;
    });

    it('should return false if value is outside the range', () => {
        expect(s.isValid('::2017', new Date('2000'))).to.be.false;
    });

    it('should implement a generator', () => {
        const start = new Date('2017');
        const end = new Date('2018');
        expect(s.exercise('::2017')).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => s.isIntInRange(start, end, v)));
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::2017', new Date('2017-04-27'))).to.be.true;
    });

    xit('should use the spec to test', () => {
        const instIn = s.instIn;
        const specs = require('../specs/instIn');
        s.fdef(instIn, specs);

        expect(stest.check(instIn)).to.have.property('result').to.equal(true);        
    });
});
