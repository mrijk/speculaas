'use strict';

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isInteger} = require('./utils');

describe('Test the exercise function', () => {
    it('should generate 10 integers', () => {
        expect(s.exercise(isInteger)).to.have.length(10);
    });

    it('should generate 10 random values from a set', () => {
        s.def('::color', ['Red', 'Blue', 'Dun']);
        console.log(s.exercise('::color'));
    });    
});
