instIn
=====

Usage: ```instIn(start, end)```

Returns a spec that validates insts in the range from start
(inclusive) to end (exclusive).

[Source](https://github.com/mrijk/speculaas/blob/master/lib/instIn.js)

Example:

```js
const s = require('speculaas');

// spec for all dates in 2017
s.def('::2017', s.instIn(new Date('2017'), new Date('2018')));

s.isValid('::2017', new Date('2017-04-27'));
// true
```
