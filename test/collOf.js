const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {isInteger, isNumber, isSet, isString, isVector} = s.utils;

describe('Test the collOf function', () => {
    before(() => {
        s.def('::vnum3', s.collOf(isNumber, {kind: isVector, count: 3, distinct: true}));
    });

    it('should return a spec for a collection', () => {
        expect(s.isValid('::vnum3', [1, 2, 3])).to.be.true;
    });

    it('should fail on invalid type (not a vector)', () => {
        expect(s.isValid('::vnum3', {x: 1, y: 2, z: 3})).to.be.false;
    });

    it('should fail on non-distinct data', () => {
        expect(s.isValid('::vnum3', [1, 1, 1])).to.be.false;
    });

    it('should fail on invalid data', () => {
        expect(s.isValid('::vnum3', [1, 2, 'foo'])).to.be.false;
    });

    it('should fail on invalid length', () => {
        expect(s.isValid('::vnum3', [1, 2, 3, 4])).to.be.false;
    });

    it('should conform to a valid value',  () => {
        expect(s.conform(s.collOf(isNumber), [5, 10, 2])).to.eql([5, 10, 2]);
    });

    it('should unform a conformed value', () => {
        s.def('::vnum', s.collOf(isNumber));
        const input = [5, 10, 2];
        const conformed = s.conform("::vnum", input);
        expect(s.unform('::vnum', conformed)).to.eql(input);
    });

    it('should have a minCount of 3', () => {
        s.def('::vnum', s.collOf(isNumber, {minCount: 3}));
        expect(s.isValid('::vnum', [])).to.be.false;
        expect(s.isValid('::vnum', [1, 2, 3])).to.be.true;
    });

    it('should have a maxCount of 3', () => {
        s.def('::vnum', s.collOf(isNumber, {maxCount: 3}));
        expect(s.isValid('::vnum', [1, 2, 3, 4])).to.be.false;
        expect(s.isValid('::vnum', [1, 2, 3])).to.be.true;
    });

    it('should output to a Set if :into param is set', () => {
        s.def('::vnum', s.collOf(isNumber, {into: new Set()}));
        expect(s.conform('::vnum', [1, 2, 3])).to.be.an.instanceof(Set);
    });

    it('should accept an object of type Set as input', () => {
        s.def('::vset3', s.collOf(isNumber, {kind: isSet, count: 3}));
        expect(s.isValid('::vset3', new Set([1, 2, 3]))).to.be.true;
        expect(s.conform('::vset3', new Set([1, 2, 3]))).to.be.an.instanceof(Set);
    });

    it('should output to an Array if :into param is array', () => {
        s.def('::vset3', s.collOf(isNumber, {into: []}));
        expect(s.conform('::vset3', new Set([1, 2, 3]))).to.be.an.instanceof(Array);
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.collOf(isInteger))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => _.isArray(v)));
    });

    it('should implement describe', () => {
        expect(s.describe('::vnum3')).to.eql(['collOf', 'isNumber', 'kind', 'isArray', 'count', 3, 'distinct', true]);
    });
});
