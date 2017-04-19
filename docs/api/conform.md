conform
=====

Usage: ```conform(spec, x)```

Given a spec and a value, returns ':node.spec/invalid' if value does not match spec,
else the (possibly destructured) value.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/conform.js)

Example:

```js
const s = require('speculaas');
const {isInteger} = int.utils;

s.def('::a', isInteger);
s.conform('::a', 12);
// 12
```
