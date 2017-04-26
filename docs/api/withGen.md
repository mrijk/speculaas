withGen
=====

Usage: ```withGen(spec, genFn)```

Takes a spec and a no-arg, generator-returning fn and returns a version of that spec that uses that generator

[Source](https://github.com/mrijk/speculaas/blob/master/lib/withGen.js)

Example:

```js
const s = require('speculaas');
const testcheck = require('testcheck');

// Only generate integers in the [5, 7) range
const gen = () => testcheck.gen.intWithin(5, 7);

const spec = s.withGen(s.intIn(0, 10), gen);
```
