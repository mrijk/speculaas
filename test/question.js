const _ = require('lodash');

const {expect} = require('chai');;

const s = require('../lib/spec');
const stest = require('../lib/test');

const {idemPotent} = require('./utils');

const {isInteger, isNull, isOdd, isString} = s.utils;

describe('Test the question (?) function', () => {
    s.def('::odd?', s.and(isInteger, isOdd));
    const odds = s.question('::odd?');
    
    it('should return the value', () => {
        expect(s.conform(odds, [1])).to.deep.equal(1);
    });
    
    it('should accept an empty value sequence', () => {
        expect(s.conform(odds, [])).to.deep.equal(null);
    });
    
    it('should not allow 2 or more values', () => {
        expect(s.isValid(odds, [1, 3])).to.be.false;
    });

    it('should unform a conformed value', () => {
        expect(idemPotent(odds, [1])).to.be.true;
    });

    it('should implement a generator', () => {
        expect(s.exercise(s.question(isString))).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([[v]]) => _.isUndefined(v) || isString(v)));
    });

    it('should use the spec to test', () => {
        const question = s.question;
        const specs = require('../specs/question');

        s.fdef(question, specs);

        expect(stest.check(question)).to.have.property('result').to.equal(true);        
    });

    it('should exercise the question function', () => {
        const question = s.question;
        const specs = require('../specs/question');

        s.fdef(question, specs);
        
        const questions = _.map(s.exerciseFn(question), ([, s]) => s);
 
        _.forEach(questions, q => s.exercise(q));
    });
});
