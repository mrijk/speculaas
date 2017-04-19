alt
=====

Usage: ```alt([, ...keyPredForms])```

Returns a regex op that returns a map entry containing the key of the
first matching pred and the corresponding value. Thus the
'key' and 'val' functions can be used to refer generically to the
components of the tagged return.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/alt.js)

Example:

```js
const s = require('speculaas');
const {isBoolean, isString} = s.utils;

s.def('::bool-or-string', s.alt(':s', isString, ':b', isBoolean));
    
s.isValid('::bool-or-string', [true]);
// true

s.isValid('::bool-or-string', ['foo']);
// true

s.isValid('::bool-or-string', [1]);
// false
```
