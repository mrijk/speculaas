'use strict';

const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {isNull, isString} = s.utils;

describe('Test the nilable function', () => {
    it('should create a spec that allows null as a valid value', () => {
        expect(s.isValid(isString, null)).to.be.false;
        expect(s.isValid(s.nilable(isString), null)).to.be.true;            
    });

    it('should create a named spec that allows null as a valid value', () => {
        s.def('::string?', isString);
        expect(s.isValid(s.nilable('::string?'), 'foobar')).to.be.true;
        expect(s.isValid(s.nilable('::string?'), null)).to.be.true;
    });

    it('should test the conform', () => {
        expect(s.conform(s.nilable(isString), null)).to.be.null;
        expect(s.conform(s.nilable(isString), 'foobar')).to.equal('foobar');
    });

    it('should implement a generator', () => {
        s.def('::nilable', s.nilable(isString));
        expect(s.exercise('::nilable')).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => isNull(v) || isString(v)));
    });
});
