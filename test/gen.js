'use strict';

const {expect} = require('chai')

const {isInteger} = require('./utils');

const s = require('../spec');
const gen = require('../gen');

describe('Test node.spec.gen functions', () => {

    it('should generate a single integer', () => {
        expect(isInteger(gen.generate(s.gen(isInteger)))).to.be.true;
    });
});
