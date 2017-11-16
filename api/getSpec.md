getSpec
=====

Usage: ```getSpec(k)```

Returns spec registered for keyword/symbol/var k, or undefined.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/def.js)

Example:

```js
const s = require('speculaas');
const {isOdd} = s.utils;

s.def('::odd?', isOdd);
s.getSpec('::odd?');

```
