or
=====

Usage: ```or([...keyPredForms])```

Returns a destructuring spec that returns a map entry containing the
key of the first matching pred and the corresponding value. Thus the
'key' and 'val' functions can be used to refer generically to the
components of the tagged return.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/or.js)

Example:

```js
const s = require('speculaas');
const {isInt, isString} = s.utils;

s.def('::name-or-id', s.or(':name', isString, ':id', isInt));

s.conform('::name-or-id', 'abc'));
// [':name', 'abc']
```
