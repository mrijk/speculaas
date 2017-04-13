const {expect} = require('chai');

const s = require('../lib/spec');
const {isOdd} = s.utils;

describe('Test the define function', () => {

    it('should allow an array as predicate', () => {
        const suit = [':club', ':diamond', ':heart', ':spade'];
        s.def('::suit', suit);
        expect(s.isValid('::suit', ':club')).to.be.true;
    });

    it('should accept a Symbol', () => {
        const odd = Symbol();
        s.def(odd, isOdd);
        expect(s.isValid(odd, 13)).to.be.true;
    });
});
