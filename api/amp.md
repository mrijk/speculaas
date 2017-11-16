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
const {isEven, isString} = s.utils;

// Spec for array with even number of strings
s.def('::even-strings', s.amp(s.star(isString), x => isEven(x.length)));

s.isValid('::even-strings', ['a', 1]);
// false

s.isValid('::even-strings', ['a', 'b']);
// true

s.isValid('::even-strings', ['a', 'b', 'c']);
// false
```
