'use strict';

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isBoolean, isString} = require('./utils');

describe('Test the alt function', () => {
    s.def('::bool-or-string', s.alt(':s', isString, ':b', isBoolean));
    
    it('should match a bool or string', () => {
        expect(s.isValid('::bool-or-string', [true])).to.be.true;
        expect(s.isValid('::bool-or-string', ['foo'])).to.be.true;
    });
    
    it('should not match an integer', () => {
        expect(s.isValid('::bool-or-string', [1])).to.be.false;
    });

    it('should conform to a string', () => {
        expect(s.conform('::bool-or-string', [true])).to.eql([':b', true]);
        expect(s.conform('::bool-or-string', ['foo'])).to.eql([':s', 'foo']);
    });
});

