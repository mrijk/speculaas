const {expect} = require('chai');

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

    it('should unform a conformed value', () => {
        expect(idemPotent(s.spec(x => x < 42), 13)).to.be.true;
    });
});
