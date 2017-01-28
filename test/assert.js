'use strict';

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isString} = require('./utils');

describe('Test the assert functions', () => {

    it('should set and get the checkAsserts', () => {
        s.checkAsserts(true);
        expect(s.isCheckAsserts()).to.be.true;
        s.checkAsserts(false);
        expect(s.isCheckAsserts()).to.be.false;
    });

    it('should throw an error if the assertion of a function fails', () => {

        s.def('::first-name', isString);
        s.def('::person', s.keys({req: ['::first-name'], opt: ['::phone']}));

        const personName = person => {
            const p = s.assert('::person', person);
            return p['::first-name'];
        };

        s.checkAsserts(false);

        const noName = {};
        expect(() => personName(noName)).to.not.throw(Error);

        s.checkAsserts(true);

        expect(() => personName(noName)).to.throw(Error, /Spec assertion failed/);

        const validName = {'::first-name': 'Elon'};
        expect(() => personName(validName)).to.not.throw(Error);
    })
});
