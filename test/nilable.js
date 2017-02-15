'use strict';

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isString} = require('./utils');

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

    it.only('should implement a generator', () => {
        s.def('::nilable', s.nilable(isString));
        console.log(s.exercise('::nilable'));
//        expect(s.exercise(s.nilable(isString))).to.have.length(10)
//            .to.satisfy(sample => _.every(sample, ([[v]]) => isBoolean(v) || isString(v)));
    });
});
