const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isString} = s.utils;

describe('Test the keys function', () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/

    before(() => {
        s.def('::email-type', s.and(isString, s => emailRegex.test(s)));
        
        s.def('::first-name', isString);
        s.def('::last-name', isString);
        s.def('::email', '::email-type');
        s.def('::phone', isString);
        s.def('::person', s.keys({req: ['::first-name', '::last-name', '::email'], opt: ['::phone']}));
    });

    describe('should handle valid input', () => {
        const person = {
            '::first-name': 'Elon',
            '::last-name': 'Musk',
            '::email': 'elon@example.com'
        };
 
        it('should should accept object with required keys', () => {
            expect(s.isValid('::person', person)).to.be.true;
        });

        it('should should accept object with required and optional keys', () => {
            expect(s.isValid('::person',
                             {
                                 '::first-name': 'Elon',
                                 '::last-name': 'Musk',
                                 '::email': 'elon@example.com',
                                 '::phone': '06 12345678'
                             })).to.be.true;
        });

        it('should conform an empty object when no keys are specified', () => {
            expect(s.conform(s.keys({}), {})).to.eql({});
        });
        
        it('should conform any object when no keys are specified', () => {
            expect(s.conform(s.keys({}), {':a': 1})).to.eql({':a': 1});
        });

        it('explainData should return null', () => {
            expect(s.explainData('::person', person)).to.be.null;
        });
    });

    describe('should reject invalid input', () => {
        const invalidPerson = {
            '::first-name': 'Elon',
            '::last-name': 'Musk',
            '::email': 'n/a'
        };

        it('should fail if required key is missing', () => {
            expect(s.isValid('::person',
                             {
                                 '::first-name': 'Elon'
                             })).to.be.false;
        });

        it('should fail if attribute doesn\'t conform', () => {
            expect(s.isValid('::person', invalidPerson)).to.be.false;
        });

        it('explainData should report a problem', () => {
            expect(s.explainData('::person', invalidPerson)).to.eql({
                problems: [
                    {
                        path: [],
                        val: 'n/a',
                        pred: 's => emailRegex.test(s)',
                        via: ['::person', '::email'],
                        'in': ['::email']
                    }
                ]
            });
        });
    });

    it('should unform a conformed value', () => {
        const input = {
            '::first-name': 'Elon',
            '::last-name': 'Musk',
            '::email': 'elon@example.com'
        };
        expect(idemPotent('::person', input)).to.be.true;
    });

    it('should implement a generator', () => {
        const req = ['::first-name', '::last-name'];
        const opt = ['::phone'];
        s.def('::oldPerson', s.keys({req, opt}));
        
        expect(s.exercise('::oldPerson')).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => _.every(req, k => _.has(v, k))));
    });

    it('should implement describe', () => {
        expect(s.describe('::person')).to.eql(['keys', 'req', ['::first-name', '::last-name', '::email'], 'opt', ['::phone']]);
    });
});

