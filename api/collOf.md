collOf
=====

Usage: ```collOf(pred[,opts])```

Returns a spec for a collection of items satisfying pred. Unlike
['every'](every.md), collOf will exhaustively conform every value.

Same options as ['every'](every.md). conform will produce a collection
corresponding to :into if supplied, else will match the input collection,
avoiding rebuilding when possible.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/collOf.js)

Example:

```js
const s = require('speculaas');
const {isNumber, isVector} = s.utils;

// spec for vector with 3 unique numbers
s.def('::vnum3', s.collOf(isNumber, {kind: isVector, count: 3, distinct: true}));

s.isValid('::vnum3', [1, 2, 3]);
// true

s.isValid('::vnum3', [1, 2, 2]);
// false
```
