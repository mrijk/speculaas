'use strict';

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isString} = require('./utils');

describe('Test the nilable function', () => {
    it('should create a spec that allows null as a valid value', () => {
        expect(s.isValid(isString, null)).to.be.false;
        expect(s.isValid(s.nilable(isString), null)).to.be.true;            
    });
});
