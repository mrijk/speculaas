'use strict';

const {expect} = require('chai');

const {isOdd, isInteger, isString, invalidString} = require('./utils');

describe('Test node.spec functions', () => {
    const s = require('../lib/spec');

    const suit = [':club', ':diamond', ':heart', ':spade'];

    describe('Test the define function', () => {
        it('should allow an array as predicate', () => {
            s.def('::suit', suit);
            expect(s.isValid('::suit', ':club')).to.be.true;
        });
    });

    describe('Test the getSpec function', () => {
        it('should return an existing spec', () => {
            s.def('::odd?', s.and(isInteger, isOdd));
            expect(s.getSpec('::odd?')).to.exist;
        });

        it('should return null on an non-existing spec', () => {
            expect(s.getSpec('::foobar?')).to.be.undefined;
        });
    });
});
