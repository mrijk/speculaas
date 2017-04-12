intIn
=====

Usage: ```intIn(start end)```

Returns a spec that validates ints in the range from start (inclusive) to end (exclusive).

[Source](https://github.com/mrijk/speculaas/blob/master/lib/intIn.js)

Example:

```js
const s = require('speculaas');

// Define range of a single byte
s.def('::oneByte', s.intIn(0, 256));

s.isValid('::oneByte', 0);
// true

s.isValid('::oneByte', 256);
// false

s.isValid('::oneByte', 512);
// false
```
