const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isBoolean, isInteger, isOdd, isString} = s.utils;

describe('Test the star (*) function', () => {
    s.def('::odd?', s.and(isInteger, isOdd));
    const odds = s.star('::odd?');
    
    xit('should return the value', () => {
        expect(s.conform(odds, [1, 3])).to.eql([1, 3]);
    });
    
    it('should accept an empty value sequence', () => {
        expect(s.conform(odds, [])).to.eql([]);
    });

    it('should unform a conformed value', () => {
        expect(idemPotent(odds, [])).to.be.true;
    });

    it('should accept sequence', () => {
        s.def('::opts', s.star(s.cat(':opt', isString, ':val', isBoolean)));
        expect(s.conform('::opts', [':silent?', false, ':verbose', true])).to.eql(
            [{':opt': ':silent?',
              ':val': false,
             },
             {':opt': ':verbose',
              ':val': true
             }]);
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.star(isInteger))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => _.isArray(v) && v.length >= 0));
    });

    it('should implement describe', () => {
        s.def('::odds', s.star(isOdd))
        expect(s.describe('::odds')).to.eql(['star', 'isOdd']);
    });
});
