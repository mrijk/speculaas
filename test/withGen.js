const {expect} = require('chai');

const testcheck = require('testcheck');

const s = require('../lib/spec');

describe('Test the withGen function', () => {
    it('should replace the generator', () => {
        const gen = () => testcheck.gen.intWithin(10, 20);
        const spec = s.withGen(s.intIn, gen);
    });
});
