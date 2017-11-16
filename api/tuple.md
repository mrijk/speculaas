tuple
=====

Usage: ```tuple([...preds])```

[Source](https://github.com/mrijk/speculaas/blob/master/lib/tuple.js)

Example:

```js
const s = require('speculaas');
const {isDouble} = s.utils;

s.def('::point', s.tuple(isDouble, isDouble, isDouble));

s.isValid('::point', [1.5, 2.5, -0.5]);
// true

s.isValid('::point', [1.5, 2.5, -0.5, 3.0]);
// false
```
