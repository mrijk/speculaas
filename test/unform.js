'use strict';

const {expect} = require('chai');

const s = require('../lib/spec');

const {isEven, isInteger} = s.utils;

describe('Test the unform function', () => {
    before(() => {
        s.def('::a', isInteger);
    });

    it('should return the unformed value', () => {
        expect(s.unform('::a', 12)).to.equal(12);
    });

    it('should return the unformed value', () => {
        s.def('::small', s.or(':even', isEven, ':small', x => x < 42));
        const conformed = s.conform('::small', 3);
        expect(s.unform('::small', conformed)).to.equal(3);
    });
});
