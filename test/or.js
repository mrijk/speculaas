'use strict';

const {expect} = require('chai');;

const s = require('../spec');

const {isInt, isInteger, isString} = require('./utils');

describe('Test the or function', () => {
    it('should test the or of 1 spec', () => {
        s.def('::integer?', s.or(':x', isInteger));
        expect(s.isValid('::integer?', 12)).to.be.true;
        expect(s.isValid('::integer?', 'foobar')).to.be.false;
    });
    
    it('should test the or of 2 specs', () => {
        s.def('::name-or-id', s.or(':name', isString, ':id', isInt));
        expect(s.isValid('::name-or-id', 'abc')).to.be.true;
        expect(s.isValid('::name-or-id', 100)).to.be.true;
        expect(s.isValid('::name-or-id', 3.14)).to.be.false;
    });
});
