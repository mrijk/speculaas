isIntInRange
=====

Usage: ```isIntInRange(start, end, val)```

Return true if start <= val and val < end

[Source](https://github.com/mrijk/speculaas/blob/master/lib/intIn.js)

Example:

```js
const s = require('speculaas');

s.isIntInRange(0, 13, 0);
// true

s.isIntInRange(0, 13, -42);
// false
```
