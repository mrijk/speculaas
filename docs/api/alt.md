alt
=====

Usage: ```alt(...)```

Returns a spec that accepts null and values satisfying pred.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/alt.js)

Example:

```js
const s = require('speculaas');
const {isBoolean, isString} = require('lodash');

s.def('::bool-or-string', s.alt(':s', isString, ':b', isBoolean));
    
s.isValid('::bool-or-string', [true]);
// true

s.isValid('::bool-or-string', ['foo']);
// true

s.isValid('::bool-or-string', [1]);
// false
```
