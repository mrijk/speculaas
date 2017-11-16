plus
=====

Usage: ```plus(predForm)```

Returns a regex op that matches one or more values matching
pred. Produces a vector of matches.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/plus.js)

Example:

```js
const s = require('speculaas');
const {isInteger, isOdd} = s.utils;

s.def('::odd?', s.and(isInteger, isOdd));
s.def('::odds', s.plus('::odd?'));

s.isValid('::odds', [1, 3]);
// true

s.isValid('::odds', []);
// false
```
