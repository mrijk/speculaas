// Example: One Fish Spec Fish. Node.spec implementation
// of http://gigasquidsoftware.com/blog/2016/05/29/one-fish-spec-fish/
// Blog by Carin Meier

const _ = require('lodash');

const s = require('../lib/spec');

const fishNumbers = {0: 'Zero', 1: 'One', 2: 'Two'};

s.def('::fish-number', _.keys(fishNumbers));

console.log(s.isValid('::fish-number', 1));
s.isValid('::fish-number', 5);
