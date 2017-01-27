'use strict';

const {expect} = require('chai');;

const s = require('../spec');

const {isNumber, isString} = require('./utils');

describe('Test the cat function', () => {
    s.def('::ingredient', s.cat(isNumber, isString));
   
    it('should match a concatenation', () => {
        expect(s.isValid('::ingredient', [2, ':teaspoon'])).to.be.true;
    });

    it('should fail if concatenation doesn\'t match', () => {
        expect(s.isValid('::ingredient', [2, 13])).to.be.false;
    });
});

