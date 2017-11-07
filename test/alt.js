const _ = require('lodash');

const {expect} = require('chai');;

const s = require('../lib/spec');

const {exerciseFunc} = require('./utils');

const {isBoolean, isString} = s.utils;

describe('Test the alt function', () => {
    before(() => {
        s.def('::bool-or-string', s.alt(':s', isString, ':b', isBoolean));
    });

    describe('should handle valid input', () => {
        it('should match a bool or string', () => {
            expect(s.isValid('::bool-or-string', [true])).to.be.true;
            expect(s.isValid('::bool-or-string', ['foo'])).to.be.true;
        });

        it('should implement explain', () => {
            expect(s.explainData('::bool-or-string', [true])).to.be.null;
        });

        it('should not allow zero predicates on any input', () => {
            expect(s.isValid(s.alt(), [1])).to.be.false;
        });
    });

    describe('should reject invalid input', () => {
        it('should not match an integer', () => {
            expect(s.isValid('::bool-or-string', [1])).to.be.false;
        });

        it('should conform to a string', () => {
            expect(s.conform('::bool-or-string', [true])).to.eql([':b', true]);
            expect(s.conform('::bool-or-string', ['foo'])).to.eql([':s', 'foo']);
        });

        it('explainData should reject invalid length', () => {
            expect(s.explainData('::bool-or-string', [])).to.be.eql({
                problems: [
                    {
                        path: [],
                        reason: 'Insufficient input',
                        pred: ['alt', ':s', 'isString', ':b', 'isBoolean'],
                        val: [],
                        via: ['::bool-or-string'],
                        'in': []
                    }
                ]
            });
        });

        it('explainData should reject extra input', () => {
            expect(s.explainData('::bool-or-string', [true, true])).to.be.eql({
                problems: [
                    {
                        path: [],
                        reason: 'Extra input',
                        pred: ['alt', ':s', 'isString', ':b', 'isBoolean'],
                        val: [true],
                        via: ['::bool-or-string'],
                        'in': [1]
                    }
                ]
            });
        });

        it('explainData should reject invalid input', () => {
            expect(s.explainData('::bool-or-string', [1])).to.be.eql({
                problems: [
                    {
                        path: [':s'],
                        pred: 'isString',
                        val: 1,
                        via: ['::bool-or-string'],
                        'in': [0]
                    },
                    {
                        path: [':b'],
                        pred: 'isBoolean',
                        val: 1,
                        via: ['::bool-or-string'],
                        'in': [0]
                    },
                ]
            });
        });
    });

    it('should handle list of values', () => {
        s.def('::opt', s.cat(':prop', isString, ':val', '::bool-or-string'));
        expect(s.conform('::opt', ['-verbose', true])).to.eql({':prop': '-verbose', ':val': [':b', true]});
    });

    it('should handle list of values', () => {
        s.def('::config', s.star(s.cat(':prop', isString, ':val', '::bool-or-string')));
        expect(s.conform('::config', ['-server', 'foo', '-verbose', true, 'user', 'joe'])).to.eql([
            {
                ':prop': '-server',
                ':val': [':s', 'foo']
            },
            {
                ':prop': '-verbose',
                ':val': [':b', true]
            },
            {
                ':prop': 'user',
                ':val': [':s', 'joe']
            }
        ]);
    });

    it('should implement a generator', () => {
        expect(s.exercise('::bool-or-string', 7)).to.have.length(7)
            .to.satisfy(sample => _.every(sample, ([[v]]) => isBoolean(v) || isString(v)));
    });

    it('should implement describe', () => {
        expect(s.describe('::bool-or-string')).to.eql(['alt', ':s', 'isString', ':b', 'isBoolean']);
    });

    xit('should exercise the alt spec', () => {
        exerciseFunc(s.alt, '../specs/alt');
    });
});
