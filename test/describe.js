'use strict';

const {expect} = require('chai');;

const s = require('../lib/spec');

describe('Test the describe function', () => {
    
    it('should describe describe an array', () => {
        const colors = ['Red', 'Blue', 'Dun'];
        s.def('::color', colors);
        expect(s.describe('::color')).to.eql(colors);
    });
});

