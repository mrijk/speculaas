'use strict';

const _ = require('lodash');

const expect = require('chai').expect;

describe('Test node.spec.gen functions', function() {
    const s = require('../spec');
    const gen = require('../gen');

    const isInteger = _.isInteger;

    it('should generate a single integer', () => {
        expect(isInteger(gen.generate(s.gen(isInteger)))).to.be.true;
    });
});
