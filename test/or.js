'use strict';

const {expect} = require('chai');;

const s = require('../spec');

const {isInt, isInteger, isString} = require('./utils');

describe('Test the or function', () => {

    s.def('::integer?', s.or(':x', isInteger));
    s.def('::name-or-id', s.or(':name', isString, ':id', isInt));

    it('should test the or of 1 spec', () => {
        expect(s.isValid('::integer?', 12)).to.be.true;
        expect(s.isValid('::integer?', 'foobar')).to.be.false;
    });
    
    it('should test the or of 2 specs', () => {
        expect(s.isValid('::name-or-id', 'abc')).to.be.true;
        expect(s.isValid('::name-or-id', 100)).to.be.true;
        expect(s.isValid('::name-or-id', 3.14)).to.be.false;
    });

    it('should return tag name and conformed value', () => {
        expect(s.conform('::name-or-id', 'abc')).to.eql([':name', 'abc']);
        expect(s.conform('::name-or-id', 13)).to.eql([':id', 13]);
    });
});
