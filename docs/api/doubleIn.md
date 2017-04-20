doubleIn
=====

Usage: ```doubleIn([options])```

Specs a 64-bit floating point number. 

Options:

- isInfinite
- isNaN
- min
- max

[Source](https://github.com/mrijk/speculaas/blob/master/lib/doubleIn.js)

Example:

```js
const s = require('speculaas');
const {isBoolean, isString} = s.utils;

s.def('::percentage', s.doubleIn({min: 0.0, max: 100.0}));

s.isValid('::percentage', 50.1);
// true

s.isValid('::percentage', 101.0);
// false
```
