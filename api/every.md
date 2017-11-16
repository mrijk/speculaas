every
=====

Usage: ```every(pred[,opts])```

[Source](https://github.com/mrijk/speculaas/blob/master/lib/every.js)

Example:

```js
const s = require('speculaas');
const {isNumber, isVector} = s.utils;

// spec for vector with 3 unique numbers
s.def('::vnum3', s.every(isNumber, {kind: isVector, count: 3, distinct: true}));

s.isValid('::vnum3', [1, 2, 3]);
// true

s.isValid('::vnum3', [1, 2, 2]);
// false
```
