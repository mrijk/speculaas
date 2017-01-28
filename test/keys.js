'use strict';

const {expect} = require('chai');

const s = require('../spec');

const {isString} = require('./utils');

describe('Test the keys function', () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/

    before(() => {
        s.def('::email-type', s.and(isString, s => emailRegex.test(s)));
        
        s.def('::first-name', isString);
        s.def('::last-name', isString);
        s.def('::email', '::email-type');
        s.def('::person', s.keys({req: ['::first-name', '::last-name', '::email'], opt: ['::phone']}));
    });

    it('should should accept object with required keys', () => {
        expect(s.isValid('::person',
                         {
                             '::first-name': 'Elon',
                             '::last-name': 'Musk',
                             '::email': 'elon@example.com'
                         })).to.be.true;
    });

    it('should fail if required key is missing', () => {
        expect(s.isValid('::person',
                         {
                             '::first-name': 'Elon'
                         })).to.be.false;
    });

    it('should fail if attribute doesn\'t conform', () => {
        expect(s.isValid('::person',
                         {
                             '::first-name': 'Elon',
                             '::last-name': 'Musk',
                             '::email': 'n/a'
                         })).to.be.false;
    });
});

