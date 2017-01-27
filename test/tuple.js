'use strict';

const {expect} = require('chai');

const s = require('../spec');

const {isDouble} = require('./utils');

describe('Test the tuple function', () => {
    s.def('::point', s.tuple(isDouble, isDouble, isDouble));
    
    it('should return a spec for a tuple', () => {
        expect(s.isValid('::point', [1.5, 2.5, -0.5])).to.be.true;
    });
    
    it('should fail on invalid data', () => {
        expect(s.isValid('::point', [1.5, 2.5, 'foo'])).to.be.false;
    });
    
    it('should fail on invalid data length', () => {
        expect(s.isValid('::point', [1.5, 2.5, -0.5, 3.0])).to.be.false;
    });
});
