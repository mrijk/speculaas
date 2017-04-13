const _ = require('lodash');

const {expect} = require('chai');;

const s = require('../lib/spec');

const {isBoolean, isString} = s.utils;

describe('Test the alt function', () => {
    s.def('::bool-or-string', s.alt(':s', isString, ':b', isBoolean));
    
    it('should match a bool or string', () => {
        expect(s.isValid('::bool-or-string', [true])).to.be.true;
        expect(s.isValid('::bool-or-string', ['foo'])).to.be.true;
    });
    
    it('should not match an integer', () => {
        expect(s.isValid('::bool-or-string', [1])).to.be.false;
    });

    it('should conform to a string', () => {
        expect(s.conform('::bool-or-string', [true])).to.eql([':b', true]);
        expect(s.conform('::bool-or-string', ['foo'])).to.eql([':s', 'foo']);
    });

    xit('should handle list of values', () => {
        s.def('::opt', s.cat(':prop', isString,
                             ':val', s.alt(':s', isString, ':b', isBoolean)));
        expect(s.conform('::opt', ['-verbose', true])).to.eql({':prop': '-verbose', ':val': [':b', true]});
    });

    xit('should handle list of values', () => {
        s.def('::config', s.star(s.cat(':prop', isString,
                                       ':val', s.alt(':s', isString, ':b', isBoolean))));
        expect(s.conform('::config', ['-server', 'foo', '-verbose', true, 'user', 'joe'])).to.eql([]);
    });

    it('should implement a generator', () => {
        expect(s.exercise('::bool-or-string', 7)).to.have.length(7)
            .to.satisfy(sample => _.every(sample, ([[v]]) => isBoolean(v) || isString(v)));
    });
});

