const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isEven, isString} = s.utils;

describe('Test the amp (&) function', () => {
    before(() => {
        s.def('::even-strings', s.amp(s.star(isString), x => isEven(x.length)));
    });
    
    it('should return true if sequence contains even number of strings', () => {
        expect(s.isValid('::even-strings', [])).to.be.true;
        expect(s.isValid('::even-strings', ['a', 'b'])).to.be.true;
    });

    it('should return false if sequence contains odd number of strings', () => {
        expect(s.isValid('::even-strings', ['a'])).to.be.false;
        expect(s.isValid('::even-strings', ['a', 1])).to.be.false;
        expect(s.isValid('::even-strings', ['a', 'b', 'c'])).to.be.false;
    });

    it('should return even-sized array of strings', () => {
        expect(s.conform('::even-strings', ['a', 'b'])).to.eql(['a', 'b']);
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::even-strings', ['a', 'b'])).to.be.true;
    });

    it('should implement a generator', () => {
        expect(s.exercise('::even-strings')).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => isEven(v.length)));
    });
});


