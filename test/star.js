'use strict';

const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {isInteger, isOdd} = s.utils;

describe('Test the star (*) function', () => {
    s.def('::odd?', s.and(isInteger, isOdd));
    const odds = s.star('::odd?');
    
    it('should return the value', () => {
        expect(s.conform(odds, [1, 3])).to.eql([1, 3]);
    });
    
    it('should accept an empty value sequence', () => {
        expect(s.conform(odds, [])).to.eql([]);
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.star(isInteger))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => _.isArray(v) && v.length >= 0));
    });
});


