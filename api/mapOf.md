mapOf
=====

Usage: ```mapOf(kpred, vpred, opts)```

Returns a spec for a map whose keys satisfy kpred and vals satisfy vpred.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/mapOf.js)

Example:

```js
const s = require('speculaas');
const {isInteger, isString} = s.utils;

s.def('::scores', s.mapOf(isString, isInteger));

s.isValid('::scores', {'Sally': 1000, 'Joe': 500});
// true

s.isValid('::scores', {'Sally': 1000, 'Joe': '500'});
// false
```
