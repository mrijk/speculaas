'use strict';

const {expect} = require('chai');

const s = require('../lib/spec');

const {isEven, isString} = require('./utils');

describe('Test the amp (&) function', () => {
    s.def('::even-strings', s.amp(s.star(isString), x => isEven(x.length)));
    
    it('should return true if sequence contains odd number of strings', () => {
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
});


