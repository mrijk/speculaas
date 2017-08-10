star
=====

Usage: ```star(...)```

[Source](https://github.com/mrijk/speculaas/blob/master/lib/star.js)

Returns a regex op that matches zero or more values matching
pred. Produces a vector of matches iff there is at least one match

Example:

```js
const s = require('speculaas');
const {isBoolean, isString} = s.utils;
```
