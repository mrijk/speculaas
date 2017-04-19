cat
=====

Usage: ```cat(...)```

Returns a regex op that matches (all) values in sequence, returning a map
containing the keys of each pred and the corresponding value.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/cat.js)

Example:

```js
const s = require('speculaas');
const {isNumber, isString} = s.utils;

s.def('::ingredient', s.cat(':quantity', isNumber, ':unit', isString));
s.conform('::ingredient', [2, ':teaspoon']);
// {':quantity': 2, ':unit': ':teaspoon'}
```
