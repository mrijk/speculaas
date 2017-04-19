'use strict';

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isInteger, unknownString} = s.utils;

describe('Test the describe function', () => {
    
    it('should describe describe an array', () => {
        const colors = ['Red', 'Blue', 'Dun'];
        s.def('::color', colors);
        expect(s.describe('::color')).to.eql(colors);
    });

    it('should return node.spec/unknown when description is unknown', () => {
        expect(s.describe(isInteger)).to.equal(unknownString);
    });
});

