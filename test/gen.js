const {expect} = require('chai')

const s = require('../lib/spec');
const {isInt, isString} = s.utils;

const gen = require('../lib/gen');

describe('Test node.spec.gen functions', () => {

    it('should generate a single integer', () => {
        expect(isInt(gen.generate(s.gen(isInt)))).to.be.true;
    });

    it('should generate a single string', () => {
        expect(gen.generate(s.gen(isString))).to.be.a('string');
    });

    it('should generate 10 integers', () => {
        expect([...gen.sample(s.gen(isInt))]).to.have.length(10);
    });
});
