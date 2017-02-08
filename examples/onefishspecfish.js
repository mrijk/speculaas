// Example: One Fish Spec Fish. Node.spec implementation
// of http://gigasquidsoftware.com/blog/2016/05/29/one-fish-spec-fish/
// Blog by Carin Meier

const _ = require('lodash');

const s = require('../lib/spec');

const fishNumbers = {0: 'Zero',
                     1: 'One',
                     2: 'Two'};

s.def('::fish-number', _.keys(fishNumbers).map(_.toInteger));

s.isValid('::fish-number', 1);
s.isValid('::fish-number', 5);

s.explain('::fish-number', 5);

s.def('::color', ['Red', 'Blue', 'Dun']);

s.def('::first-line', s.cat(':n1', '::fish-number', ':n2', '::fish-number', 'c1', '::color', 'c2', '::color'));

s.explain('::first-line', [1, 2, 'Red', 'Black']);

const isOneBigger = ({[':n1']: n1, [':n2']: n2}) => n2 === n1 + 1;

s.def('::first-line', s.and(s.cat(':n1', '::fish-number', ':n2', '::fish-number', 'c1', '::color', 'c2', '::color'),
                            isOneBigger,
                            ({c1, c2}) => c1 !== c2));

s.isValid('::first-line', [1, 2, 'Red', 'Blue']);

s.conform('::first-line', [1, 2, 'Red', 'Blue']);

s.isValid('::first-line', [2, 1, 'Red', 'Blue']);

s.explain('::first-line', [2, 1, 'Red', 'Blue']);
