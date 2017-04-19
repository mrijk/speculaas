unform
=====

Usage: ```unform(spec, x)```

Given a spec and a value created by or compliant with a call to
'conform' with the same spec, returns a value with all conform
destructuring undone.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/unform.js)

Example:

```js
const s = require('speculaas');
const isEven = s.utils;

s.def('::small', s.or(':even', isEven, ':small', x => x < 42));
const conformed = s.conform('::small', 3);
// [':small', 3]

s.unform('::small', conformed);
// 3
```
