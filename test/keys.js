'use strict';

const {expect} = require('chai');

const s = require('../spec');

const {isString} = require('./utils');

describe('Test the keys function', () => {
    s.def('::first-name', isString);
    s.def('::lastt-name', isString);
    s.def('::person', s.keys({}));
    
    it('should return the value', () => {
        expect(s.isValid('::person',
                         {
                             '::first-name': 'Elon',
                             '::last-name': "Musk"
                         })).to.be.true;
    });
});

