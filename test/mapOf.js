const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isInteger, isString} = s.utils;

describe('Test the mapOf function', () => {
    before(() => {
        s.def('::scores', s.mapOf(isString, isInteger));
        s.def('::scores2to3', s.mapOf(isString, isInteger, {minCount: 2, maxCount: 3}));
    });
    
    it('should return a spec for a map', () => {
        expect(s.isValid('::scores', {'Sally': 1000, 'Joe': 500})).to.be.true;
    });
    
    it('should fail on invalid data', () => {
        expect(s.isValid('::scores', {'Sally': 1000, 'Joe': '500'})).to.be.false;
    });

    it('should fail if less than minCount', () => {
        expect(s.isValid('::scores2to3', {'Sally': 1000})).to.be.false;
    });

    it('should fail if greater than minCount', () => {
        expect(s.isValid('::scores2to3', {'Sally': 1000, 'Joe': 1000, 'Susan': 1000, 'Mike': 1000})).to.be.false;
    });

    it('conform the keys if conformKeys is set to true', () => {
        s.def('::foo', s.mapOf(s.conformer(_.toUpper), isInteger, {conformKeys: true}));
        expect(s.conform('::foo', {'Sally': 1000, 'Joe': 500})).to.eql({'SALLY': 1000, 'JOE': 500});
    });
    
    it('should accept an object of type Map as input', () => {
        const map = new Map(_.toPairs({'Sally': '1000', 'Joe': 500}));
        expect(s.isValid('::scores', map)).to.be.false;
    });

    it('should unform a conformed value', () => {
        expect(idemPotent('::scores', {'Sally': 1000, 'Joe': 500})).to.be.true;
    });

    it('should implement a generator', () => {
        expect(s.exercise('::scores2to3')).to.have.length(10)
            .to.satisfy(sample => _.every(sample, v => _.isArray(v) && v.length === 2));
    });
});
