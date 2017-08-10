const {expect} = require('chai');;
const sinon = require('sinon');

const s = require('../lib/spec');

const {isBoolean, isString} = s.utils;

describe('Test the explain function', () => {
    it('should return the explanation string success', () => {
        const stub = sinon.stub(process.stdout, 'write');
        s.explain(isString, 'foobar');
        stub.restore();
        expect(stub.calledWith('Success!\n')).to.be.true;
    });

    it('should return the explanation string success', () => {
        expect(s.explainStr(isString, 'foobar')).to.equal('Success!\n');
    });

    it('should return a string explaining why the spec fails', () => {
        expect(s.explainStr(isString, 1)).to.equal('val: 1 fails predicate: isString\n');
    });

    it('should return a string explaining why the spec fails with a specific reason', () => {
        s.def('::bool-or-string', s.alt(':s', isString, ':b', isBoolean));
        expect(s.explainStr('::bool-or-string', [])).to.equal('val:  fails spec: ::bool-or-string predicate: ' +
                                                              'alt,:s,isString,:b,isBoolean' +
                                                              ', Insufficient input\n');
    });    
});

