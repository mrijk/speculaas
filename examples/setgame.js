// Example: SET Game. Node.spec implementation
// of https://gist.github.com/cgrand/4985a7ef80c8c85291213437d06d9169
// by Christophe Grand

const _ = require('lodash');

const gen = require('../lib/gen');
const s = require('../lib/spec');

s.def('::shape', [':oval', ':diamond', ':squiggle']);
s.def('::color', [':red', ':purple', ':green']);
s.def('::value', [1, 2, 3]);
s.def('::shading', [':solid', ':striped', ':outline']);

s.def('::card', s.keys({req: ['::shape', '::color', '::value', '::shading']}));
s.def('::deck', s.collOf('::card', {distinct: true, maxCount: 12, minCount: 12}));

function uniqueOrDistinct(feature) {
    return x => _(x).map(feature).uniq().size() !== 2;
}

s.def('::set',
      s.and(
          s.collOf('::card', {minCount: 3, maxCount: 3, distinct: true, into: []}),
          uniqueOrDistinct('::shape'),
          uniqueOrDistinct('::color'),
          uniqueOrDistinct('::value'),
          uniqueOrDistinct('::shading')));

function deal() {
    return _.first([...gen.sample(s.gen('::deck'), 1)]);
}

function* sets(deck) {
    for (let carda of deck) {
        for (let cardb of deck) {
            for (let cardc of deck) {
                const set = [carda, cardb, cardc];
                if (s.isValid('::set', set))
                    yield set;
            }
        }
    }
}

console.log([...sets(deal())]);
