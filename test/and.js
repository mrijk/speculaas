const _ = require('lodash');

const {expect} = require('chai');;

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isEven, isInteger, invalidString} = s.utils;

describe('Test the and function', () => {
    before(() => {
        s.def('::even?', s.and(isInteger, isEven));        
    });
    
    it('should test the and of 1 spec', () => {
        s.def('::integer?', s.and(isInteger));
        expect(s.isValid('::integer?', 12)).to.be.true;
        expect(s.isValid('::integer?', 'foobar')).to.be.false;
    });
    
    it('should test the and of 2 specs', () => {
        expect(s.conform('::even?', 0)).to.equal(0);
        expect(s.conform('::even?', 13)).to.equal(invalidString);
    });

    it('should promote the conform return value', () => {
        s.def('::one-bigger', ({n1}) => {console.log(n1); return n1;});
        expect(s.conform(s.and(s.cat('n1', isInteger), '::one-bigger'), [13])).to.eql({n1: 13});
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::even?', 42)).to.be.true;
    });

    it('should implement a generator', () => {
        expect(s.exercise('::even?', 7)).to.have.length(7)
            .to.satisfy(sample => _.every(sample, ([v]) => isInteger(v) && isEven(v)));
    });
});

