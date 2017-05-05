const _ = require('lodash');

const {expect} = require('chai');
const testcheck = require('testcheck');

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

describe('Test the spec function', () => {
    it('should create a spec from a predicate', () => {
        expect(s.isValid(s.spec(x => x < 42), 13)).to.be.true;
    });

    it('should create a spec from an array', () => {
        const suit = [':club', ':diamond', ':heart', ':spade'];
        expect(s.isValid(s.spec(suit), ':spade')).to.be.true;
    });

    it('should create a spec with a generator', () => {
        const isBit = x => x === 0 | x === 1;
        const genBit = () => testcheck.gen.intWithin(0, 1);

        s.def('::bit', s.spec(isBit, {gen: genBit}));
        expect(s.exercise('::bit', 8)).to.have.length(8)
            .to.satisfy(sample => _.every(sample, ([b]) => isBit(b)))
    });
        
    it('should unform a conformed value', () => {
        expect(idemPotent(s.spec(x => x < 42), 13)).to.be.true;
    });
});
