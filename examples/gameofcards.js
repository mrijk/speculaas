// Example: game of cards

const _ = require('lodash');

const gen = require('../lib/gen');
const s = require('../lib/spec');

const {isInt, isString} = s.utils;

//
// Spec to model a game of cards
//

const isSuit = [':club', ':diamond', ':heart', ':spade'];
const isRank = _.range(2, 11).concat([':jack', ':queen', ':king', ':ace']);

// Original Clojure code to generate deck is way more elegant:
// (def deck (for [suit suit? rank rank?] [rank suit]))

const deck = [...(function* () {for (let suit of isSuit) for (let rank of isRank) yield [suit, rank];})()];

s.def('::card', s.tuple(isRank, isSuit));
s.def('::hand', s.star('::card'));

s.def('::name', isString);
s.def('::score', isInt);
s.def('::player', s.keys({req: ['::name', '::score', '::hand']}));

s.def('::players', s.star('::player'));
s.def('::deck', s.star('::card'));
s.def('::game', s.keys({req: ['::players', '::deck']}));

// We can validate a piece of this data against the schema:

const kenny = {
    '::name': 'Kenny Rogers',
    '::score': 100,
    '::hand': []
};

console.log(s.isValid('::player', kenny));

s.isValid('::game', {
    '::deck': [], // deck,
    '::players': []
    /*
        {
            '::name': 'Kenny Rogers',
            '::score': 100,
            '::hand': [[2, ':banana']]
        }
    ]
    */
});

gen.generate(s.gen('::player'));
