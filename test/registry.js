const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

describe('Test the registry function', () => {
    it('should should return the registry', () => {
        expect(_.isMap(s.registry())).to.be.true;
    });
});
