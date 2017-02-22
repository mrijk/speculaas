'use strict';

const {expect} = require('chai');;

const s = require('../../lib/spec');
const stest = require('../../lib/test');

const {isInteger} = require('../utils');

describe('Test check function', () => {
    it.only('call function', () => {
        const square = x => x * x;
        s.fdef(square, {
            args: s.cat(':x', isInteger),
            ret: isInteger
        });

        console.log(stest.check(square));
    });
});
