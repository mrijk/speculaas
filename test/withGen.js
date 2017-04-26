const _ = require('lodash');

const {expect} = require('chai');

const testcheck = require('testcheck');

const s = require('../lib/spec');

describe('Test the withGen function', () => {
    it('should replace the generator', () => {
        const gen = () => testcheck.gen.intWithin(5, 7);
        const spec = s.withGen(s.intIn(0, 10), gen);

        expect(s.exercise(spec)).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => s.isIntInRange(5, 8, v)));
    });
});
