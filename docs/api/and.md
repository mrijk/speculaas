and
=====

Usage: ```and(...)```

Returns a spec that returns the conformed value. Succesive conformed values propagate
through rest of predicates

[Source](https://github.com/mrijk/speculaas/blob/master/lib/and.js)

Example:

```js
const s = require('speculaas');
const {isInteger, isEven} = s.utils;

s.def('::even?', s.and(isInteger, isEven));

s.isValid('::even?', 12);
// true
```
