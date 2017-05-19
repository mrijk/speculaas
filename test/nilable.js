const _ = require('lodash');

const {expect} = require('chai');

const s = require('../lib/spec');
const stest = require('../lib/test');

const {isNull, isString} = s.utils;

describe('Test the nilable function', () => {
    before(() => {
        s.def('::nilable', s.nilable(isString));
    });
    
    it('should create a spec that allows null as a valid value', () => {
        expect(s.isValid(isString, null)).to.be.false;
        expect(s.isValid(s.nilable(isString), null)).to.be.true;            
    });

    it('should create a named spec that allows null as a valid value', () => {
        s.def('::string?', isString);
        expect(s.isValid(s.nilable('::string?'), 'foobar')).to.be.true;
        expect(s.isValid(s.nilable('::string?'), null)).to.be.true;
    });

    it('should test conform', () => {
        expect(s.conform('::nilable', null)).to.be.null;
        expect(s.conform('::nilable', 'foobar')).to.equal('foobar');
    });

    it('should test unconform', () => {
        expect(s.unform('::nilable', null)).to.be.null;
        expect(s.unform('::nilable', 'foobar')).to.equal('foobar');
    });

    it('should implement explain', () => {
        expect(s.explainData('::nilable', null)).to.be.null;
    });

    it('should implement a generator', () => {
        expect(s.exercise('::nilable')).to.have.length(10)
            .to.satisfy(sample => _.every(sample, ([v]) => isNull(v) || isString(v)));
    });

    it('should implement describe', () => {
        expect(s.describe('::nilable')).to.eql(['nilable', 'isString']);
    });

    it('should use the spec to test', () => {
        const nilable = s.nilable;
        const specs = require('../specs/nilable');

        s.fdef(nilable, specs);

        expect(stest.check(nilable)).to.have.property('result').to.equal(true);        
    });

    it('should exercise the nilable function', () => {
        const nilable = s.nilable;
        const specs = require('../specs/nilable');

        s.fdef(nilable, specs);
        
        const nilables = _.map(s.exerciseFn(nilable), ([, s]) => s);
 
        _.forEach(nilables, s.exercise);
    });
});
