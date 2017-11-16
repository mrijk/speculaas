isValid
=====

Usage: ```isValid(spec, x)```

Helper function that returns true when x is valid for spec.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/isValid.js)

Example:

```js
const s = require('speculaas');
const {isInteger} = s.utils;

s.def('::a', isInteger);
s.isValid('::a', 12));
// true

s.isValid(x => x > 5, 0);
// true

const suit = [':club', ':diamond', ':heart', ':spade'];
s.isValid(suit, ':club');
// true
```
