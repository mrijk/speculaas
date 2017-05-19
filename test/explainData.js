const {expect} = require('chai');;

const s = require('../lib/spec');

const {isString, unknownString} = s.utils;

describe('Test the explainData function', () => {
    it('should return null if succesful', () => {
        expect(s.explainData(isString, 'foobar')).to.equal(null);
    });

    it('should return an object explaining why the spec fails', () => {
        expect(s.explainData(isString, 1)).to.eql({
            problems: [{
                path: [],
                pred: unknownString,
                val: 1,
                via: [],
                'in': []
            }]
        });
    });
});

