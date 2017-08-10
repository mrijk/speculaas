const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isString} = s.utils;

describe('Test the keysStar (keys*) function', () => {
    describe('should handle valid input', () => {
        it('should conform an empty array when no keys are specified', () => {
            expect(s.isValid(s.keysStar({}), [])).to.be.true;
        });
    });

    it('should return a regex spec', () => {
        const spec = s.keysStar({});
        expect(s.isRegex(spec)).to.eql(spec);
    });
})

