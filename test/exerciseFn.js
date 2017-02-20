'use strict';

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isInteger} = require('./utils');

describe('Test the exerciseFn function', () => {
    it.only('call function', () => {
        const square = x => x * x;
        s.fdef(square, {
            args: s.cat(':x', isInteger)
        });

        console.log(s.exerciseFn(square));
    });
});
