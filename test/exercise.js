'use strict';

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isInteger} = require('./utils');

describe('Test the exercise function', () => {
    it.only('should generate 10 integers', () => {
        console.log(s.exercise(isInteger));
    });
});
