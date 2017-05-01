const {expect} = require('chai');

const s = require('../lib/spec');

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
});
