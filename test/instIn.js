const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');
const stest = require('../lib/test');

const {idemPotent} = require('./utils');

describe('Test the InstIn function', () => {
    before(() => {
    });

    xit('should return true if value is within range', () => {
        expect(s.isValid('::oneByte', 0)).to.be.true;
    });

    xit('should exclude the upper bound', () => {
        expect(s.isValid('::oneByte', 256)).to.be.false;
    });

    xit('should return false if value is outside the range', () => {
        expect(s.isValid('::oneByte', 512)).to.be.false;
    });

    xit('should implement a generator', () => {
        expect(s.exercise(s.intIn(0, 42))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => s.isIntInRange(0, 42, v)));
    });

    xit('should unform a conformed value', () => {
        expect(idemPotent('::oneByte', 13)).to.be.true;
    });

    xit('should use the spec to test', () => {
        const intIn = s.intIn;
        const specs = require('../specs/intIn');
        s.fdef(intIn, specs);

        expect(stest.check(intIn)).to.have.property('result').to.equal(true);        
    });
});
