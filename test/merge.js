'use strict';

const {expect} = require('chai');;

const s = require('../spec');

const {isBoolean, isString} = require('./utils');

describe('Test the merge function', () => {
    it('should merge a spec', () => {
        s.def(':animal/kind', isString);
        s.def(':animal/says', isString);
        s.def(':animal/common', s.keys({req: [':animal/kind', ':animal/says']}));
        s.def(':dog/tail?', isBoolean);
        s.def(':dog/breed', isString);
        s.def(':animal/dog', s.merge(':animal/common',
                                     s.keys({req: [':dog/tail?', ':dog/breed']})));

        expect(s.isValid(':animal/dog', {
            ':animal/kind': 'dog',
            ':animal/says': 'woof',
            ':dog/tail?': true,
            ':dog/breed': 'retriever'
        })).to.be.true;
    });
});

