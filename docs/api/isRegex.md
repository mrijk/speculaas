isRegex
=====

Usage: ```isRegex(x)```

Returns x if x is a (Speculaas) regex op, else logical false

[Source](https://github.com/mrijk/speculaas/blob/master/lib/isRegex.js)

Example:

```js
const s = require('speculaas');
const {isString} = s.utils;

const foo = s.plus(isString);
s.isRegex(foo);
// foo

const foo = s.and(isString);
s.isRegex(foo);
// null;
```
