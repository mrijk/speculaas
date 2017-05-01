const _ = require('lodash');

const {expect} = require('chai');;

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isInteger, isString, invalidString} = s.utils;

describe.only('Test the conformer function', () => {
    it('should create a spec using a predicate function', () => {
        const pred = value => isInteger(value) ? value : invalidString;
        const spec = s.conformer(pred);
        expect(s.isValid(spec, 13)).to.be.true;
        expect(s.isValid(spec, '13')).to.be.false;
    });

    it('should create a spec with an unform function', () => {
        const pred = value => isInteger(value) ? [value] : invalidString;
        const unform = ([value]) => value;

        const spec = s.conformer(pred, unform);
        expect(s.conform(spec, 13)).to.eql([13]);
        expect(s.unform(spec, [13])).to.equal(13);
    });
    
    it('should unform a conformed value', () => {
        const spec = s.conformer(isString);
        expect(idemPotent(spec, '13')).to.be.true;
    });

    it('should implement a generator', () => {
        const spec = s.conformer(isString);
        expect(s.exercise(spec, 7)).to.have.length(7)
            .to.satisfy(sample => _.every(sample, ([v]) => isString(v)));
    });
});

