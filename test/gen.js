'use strict';

const {expect} = require('chai')

const {isInteger} = require('./utils');

const s = require('../lib/spec');
const gen = require('../lib/gen');

describe('Test node.spec.gen functions', () => {

    it('should generate a single integer', () => {
        expect(isInteger(gen.generate(s.gen(isInteger)))).to.be.true;
    });
});
