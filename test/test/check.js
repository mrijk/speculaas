'use strict';

const {expect} = require('chai');;

const s = require('../../lib/spec');
const stest = require('../../lib/test');

const {isInteger} = require('../utils');

describe('Test check function', () => {
    it('should have result ok when the function is called with valid parameters and return value', () => {
        const square = x => x * x;
        s.fdef(square, {
            args: s.cat(':x', isInteger),
            ret: isInteger
        });

        expect(stest.check(square)).to.have.property('result').to.equal(true);
    });

    it('should test the :fn option', () => {
        const inc = x => x + 1;
        s.fdef(inc, {
            args: s.cat(':x', isInteger),
            ret: isInteger,
            fn: f => f.ret > f.args[':x']
        });

        expect(stest.check(inc)).to.have.property('result').to.equal(true);
    });
});
