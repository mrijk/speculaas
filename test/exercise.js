'use strict';

const _ = require('lodash');

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isInteger, isString, isBoolean} = require('./utils');

describe('Test the exercise function', () => {
    it('should generate 10 integers', () => {
        expect(s.exercise(isInteger)).to.have.length(10);
    });

    it('should generate 10 booleans', () => {
        expect(s.exercise(isBoolean)).to.have.length(10).to.satisfy(sample => _.every(sample, ([b]) => isBoolean(b)));
    });

    it('should generate 5 random values from a set', () => {
        s.def('::color', ['Red', 'Blue', 'Dun']);
        expect(s.exercise('::color', 5)).to.have.length(5);
    });

    it('should generate 7 random values from a spec', () => {
        s.def('::pairs', s.cat(':n', isInteger, ':s', isString));
        console.log(s.exercise('::pairs', 7));
    });
});
