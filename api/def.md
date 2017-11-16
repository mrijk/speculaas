def
=====

Usage: ```def(k, spec)```

Given a keyword or resolvable symbol k, and a
spec, spec-name, predicate or regex-op makes an entry in the
registry mapping k to the spec.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/def.js)

Example:

```js
const s = require('speculaas');

// Use a function as spec
s.def('::notZero', x => x !== 0);

s.isValid('::notZero', 42);
// true

// Use an array as spec
const suit = [':club', ':diamond', ':heart', ':spade'];
s.def('::suit', suit);

s.isValid('::suit', ':club'));
// true
```
