const _ = require('lodash');

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isInteger, isNull, isString, isBoolean} = s.utils;

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

    it('should generate 7 random values from a named spec', () => {
        s.def('::pairs', s.cat(':n', isInteger, ':s', isString));
        expect(s.exercise('::pairs', 7)).to.have.length(7).to.satisfy(sample => _.every(sample, ([[n, s]]) =>
                                                                                        isInteger(n) && isString(s)));
    });

    it('should generate 10 random values from a spec object', () => {
        expect(s.exercise(s.nilable(isString))).to.have.length(10).to.satisfy(sample => _.every(sample, ([s]) => isNull(s) || isString(s)));
    });

    it('should throw an exception', () => {
        s.def('::impossible', s.and(isInteger, isString));
        expect(() => s.exercise('::impossible')).to.throw(Error, /sampleFromSpec failed.*/);
    });
});
