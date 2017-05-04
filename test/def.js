const {expect} = require('chai');

const s = require('../lib/spec');
const {isOdd} = s.utils;

describe('Test the define function', () => {

    it('should allow an array as predicate', () => {
        const suit = [':club', ':diamond', ':heart', ':spade'];
        s.def('::suit', suit);
        expect(s.isValid('::suit', ':club')).to.be.true;
    });

    xit('should accept a map as predicate', () => {
        s.def('::coord', {x: 1, y: 2});
        expect(s.isValid('::coord', 'x')).to.be.true;
        expect(s.isValid('::coord', 'z')).to.be.false;
    });

    it('should use return from def', () => {
        const f = s.def('::positive', x => x > 0);
        expect(s.isValid(f, 1)).to.be.true;
    });
    
    xit('should accept a Symbol', () => {
        const odd = Symbol();
        s.def(odd, isOdd);
        expect(s.isValid(odd, 13)).to.be.true;
    });
});
