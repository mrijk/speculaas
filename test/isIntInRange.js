'use strict';

const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');
const stest = require('../lib/test');

describe('Test isIntInRange? function', () => {
    it('should return true if value is with range', () => {
        expect(s.isIntInRange(0, 13, 0)).to.be.true;
    });

    it('should exclude the upper bound', () => {
        expect(s.isIntInRange(0, 13, 13)).to.be.false;
    });

    it('should return false if value is outside the range', () => {
        expect(s.isIntInRange(0, 13, -42)).to.be.false;
    });

    it('should use the spec to test', () => {
        const intInRange = s.isIntInRange;
        const specs = require('../specs/intInRange');
        s.fdef(intInRange, specs);

        expect(stest.check(intInRange)).to.have.property('result').to.equal(true);        
    });
});
