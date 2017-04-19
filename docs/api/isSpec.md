isSpec
=====

Usage: ```isSpec(x)```

Returns x if x is a spec object, else logical false

[Source](https://github.com/mrijk/speculaas/blob/master/lib/def.js)

Example:

```js
const s = require('speculaas');

const foo = s.def('::foo', x => x > 0);
s.isSpec(foo);
// foo

s.isSpec(1);
// null
```
