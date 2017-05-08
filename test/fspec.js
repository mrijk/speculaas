const {expect} = require('chai');

const s = require('../lib/spec');
const stest = require('../lib/test');

const {isInteger} = s.utils;

describe('Test the fspec function', () => {
    it('should create a spec for a function', () => {
        const adder = x => y => x + y;
        const fspec = s.fspec({
            args: s.cat(':y', isInteger),
            ret: isInteger
        });

        expect(s.isValid(fspec, adder(2))).to.be.true;
    });

    xit('should create a spec for a function', () => {

        const adder = x => y => x + y;

        s.fdef(adder, {
            args: s.cat(':x', isInteger),
            ret: s.fspec({
                args: s.cat(':y', isInteger),
                ret: isInteger
            })
        });

        console.log(stest.check(adder));
    });
});
