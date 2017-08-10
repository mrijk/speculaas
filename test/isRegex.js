const {expect} = require('chai');

const s = require('../lib/spec');

const {check} = require('./utils');

const {isString} = s.utils;

describe('Test the isRegex function', () => {

    it('should return the regex object', () => {
        const foo = s.plus(isString);
        expect(s.isRegex(foo)).to.equal(foo);
    });

    it('should return null if the parameter is not a regex object', () => {
        const foo = s.and(isString);
        expect(s.isRegex(foo)).to.be.null;
    });

    it('should use the spec to test', () => {
        expect(check(s.isRegex, '../specs/isRegex')).to.have.property('result').to.equal(true);
    });
});
