'use strict';

const {expect} = require('chai');;

const s = require('../spec');

const {isEven, isInteger, invalidString} = require('./utils');

describe('Test the and function', () => {
    it('should test the and of 1 spec', () => {
        s.def('::integer?', s.and(isInteger));
        expect(s.isValid('::integer?', 12)).to.be.true;
        expect(s.isValid('::integer?', 'foobar')).to.be.false;
    });
    
    it('should test the and of 2 specs', () => {
        s.def('::even?', s.and(isInteger, isEven));        
        expect(s.conform('::even?', 12)).to.equal(12);
        expect(s.conform('::even?', 13)).to.equal(invalidString);
    });
});

