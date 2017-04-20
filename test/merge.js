const {expect} = require('chai');;

const s = require('../lib/spec');

const {idemPotent} = require('./utils');

const {isBoolean, isString} = s.utils;

describe.only('Test the merge function', () => {
    const doggy = {
        ':animal/kind': 'dog',
        ':animal/says': 'woof',
        ':dog/tail?': true,
        ':dog/breed': 'retriever'
    };

    before(() => {
        s.def(':animal/kind', isString);
        s.def(':animal/says', isString);
        s.def(':animal/common', s.keys({req: [':animal/kind', ':animal/says']}));
        s.def(':dog/tail?', isBoolean);
        s.def(':dog/breed', isString);
        s.def(':animal/dog', s.merge(':animal/common',
                                     s.keys({req: [':dog/tail?', ':dog/breed']})));
    });

    it('should merge a spec', () => {
        expect(s.isValid(':animal/dog', doggy)).to.be.true;
    });

    it('should notice that a snake is not a dog', () => {
        const snake = {
            ':animal/kind': 'snake',
            ':animal/says': 'ssssssss'
        };
        expect(s.isValid(':animal/dog', snake)).to.be.false;
    });
    
    it('should unform a conformed value', () => {
        expect(idemPotent(':animal/dog', doggy)).to.be.true;
    });
});

