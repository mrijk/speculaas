'use strict';

const {expect} = require('chai');

const s = require('../spec');

const {isInteger, isString} = require('./utils');

describe('Test the mapOf function', () => {
    s.def('::scores', s.mapOf(isString, isInteger, {}));
    
    it('should return a spec for a map', () => {
        expect(s.isValid('::scores', {'Sally': 1000, 'Joe': 500})).to.be.true;
    });
    
    it('should fail on invalid data', () => {
        expect(s.isValid('::scores', {'Sally': 1000, 'Joe': '500'})).to.be.false;
    });
});
