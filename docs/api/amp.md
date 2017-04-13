amp
=====

Usage: ```amp(re, preds)```

Takes a regex op re, and predicates. Returns a regex-op that consumes
input as per re but subjects the resulting value to the
conjunction of the predicates, and any conforming they might perform.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/amp.js)

Example:

```js
const s = require('speculaas');
const {isBoolean, isString} = s.utils;
```
