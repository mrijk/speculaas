const {expect} = require('chai');

const s = require('../lib/spec');
const stest = require('../lib/test');

const {isInteger} = s.utils;

describe('Test the fspec function', () => {
    const fspec = s.fspec({
        args: s.cat(':y', isInteger),
        ret: isInteger
    });

    it('should true true if the function complies to the spec', () => {
        const adder = x => y => x + y;
        expect(s.isValid(fspec, adder(2))).to.be.true;
    });

    it('should return false if the function does not comply to the spec', () => {
        const adder = x => y => 'x + y';
        expect(s.isValid(fspec, adder(2))).to.be.false;
    });

    it('should create a spec for a function', () => {

        const adder = x => y => x + y;

        s.fdef(adder, {
            args: s.cat(':x', isInteger),
            ret: s.fspec({
                args: s.cat(':y', isInteger),
                ret: isInteger
            }),
            fn: spec => spec.args[':x'] === spec.ret(0)
        });

        expect(stest.check(adder)).to.have.property('result').to.equal(true);
    });
});
