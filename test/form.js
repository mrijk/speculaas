const {expect} = require('chai');

const s = require('../lib/spec');

const {isInteger} = s.utils;

describe('Test the form function', () => {
    before(() => {
        s.def('::a', isInteger);
    });

    it('should return the form', () => {
        expect(s.form('::a')).to.eql([]);
    });
    
    it('should throw an error if spec doesn\'t exist', () => {
        expect(() => s.form('::foobar')).to.throw(Error, /Unable to resolve spec/);
    });
});

 

