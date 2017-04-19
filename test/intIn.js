const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');
const stest = require('../lib/test');

const {idemPotent} = require('./utils');

describe('Test the IntIn function', () => {
    before(() => {
        s.def('::oneByte', s.intIn(0, 256));
    });

    it('should return true if value is with range', () => {
        expect(s.isValid('::oneByte', 0)).to.be.true;
    });

    it('should exclude the upper bound', () => {
        expect(s.isValid('::oneByte', 256)).to.be.false;
    });

    it('should return false if value is outside the range', () => {
        expect(s.isValid('::oneByte', 512)).to.be.false;
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.intIn(0, 42))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => s.isIntInRange(0, 42, v)));
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::oneByte', 13)).to.be.true;
    });

    it('should use the spec to test', () => {
        const intIn = s.intIn;
        const specs = require('../specs/intIn');
        s.fdef(intIn, specs);

        expect(stest.check(intIn)).to.have.property('result').to.equal(true);        
    });
});
