exercise
=====

Usage: ```exercise(spec)```

Generates a number (default 10) of values compatible with spec and maps conform over them,
returning a sequence of [val, conformedVal] tuples. Optionally takes
a generator overrides map as per gen.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/exercise.js)

Example:

```js
const s = require('speculaas');

s.def('::color', ['Red', 'Blue', 'Dun']);
s.exercise('::color', 5);
// [ [ 'Red', 'Red' ],
//   [ 'Red', 'Red' ],
//   [ 'Dun', 'Dun' ],
//   [ 'Blue', 'Blue' ],
//   [ 'Dun', 'Dun' ] ]
```
