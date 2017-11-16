conformer
=====

Usage: ```conformer(f, unf)```

Takes a predicate function with the semantics of conform i.e. it should return either a
(possibly converted) value or ':node.spec/invalid', and returns a
spec that uses it as a predicate/conformer. Optionally takes a
second fn that does unform of result of first

[Source](https://github.com/mrijk/speculaas/blob/master/lib/conformer.js)

Example:

```js
const s = require('speculaas');
const {invalidString, isInteger} = s.utils;

const pred = value => isInteger(value) ? value : invalidString;
const spec = s.conformer(pred);

s.isValid(spec, 13);
// true

s.isValid(spec, '13');
// false
```
