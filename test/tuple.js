'use strict';

const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {isDouble, isInteger, isString} = s.utils;

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

    it('should implement a generator', () => {
        expect(s.exercise(s.tuple(isInteger, isString))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => _.isArray(v) && v.length === 2));
    });
});
