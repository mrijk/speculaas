'use strict';

const _ = require('lodash');

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isInteger, isNumber, isString} = s.utils;

describe('Test the cat function', () => {
    s.def('::ingredient', s.cat(':quantity', isNumber, ':unit', isString));
   
    it('should match a concatenation', () => {
        expect(s.isValid('::ingredient', [2, ':teaspoon'])).to.be.true;
    });

    it('should fail if concatenation doesn\'t match', () => {
        expect(s.isValid('::ingredient', [2, 13])).to.be.false;
    });

    it('should conform to a value', () => {
        expect(s.conform('::ingredient', [2, ':teaspoon'])).to.eql({':quantity': 2, ':unit': ':teaspoon'});
    });

    it('should implement a generator', () => {
        s.def('::ingredient', s.cat(':quantity', isInteger, ':unit', isString));

        expect(s.exercise('::ingredient', 7)).to.have.length(7)
            .to.satisfy(sample => _.every(sample, ([[v1, v2]]) => isInteger(v1) || isString(v2)));
    });
});

