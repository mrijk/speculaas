const {expect} = require('chai');;

const s = require('../lib/spec');

const {isInteger} = s.utils;

describe('Test the exerciseFn function', () => {
    it('call function', () => {
        const square = x => x * x;
        s.fdef(square, {
            args: s.cat(':x', isInteger),
            ret: isInteger
        });

        expect(s.exerciseFn(square, 7)).to.have.length(7);
    });
});
