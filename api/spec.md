spec
=====

Usage: ```spec(form [, {gen}])```

Takes a single predicate form, e.g. can be the name of a predicate,
like ```isEven```, or a fn literal like ```x => x < 42```. Note that it is not
generally necessary to wrap predicates in spec when using the rest
of the spec macros, only to attach a unique generator

Optionally takes ```gen``` generator-fn, which must be a fn of no args that
returns a test.check generator.

Returns a spec.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/def.js)

Example 1:

```js
const s = require('speculaas');

s.isValid(s.spec(x => x < 42), 13);
// true
```

Example 2:

```js
const s = require('speculaas');
const testcheck = require('testcheck');

const isBit = x => x === 0 | x === 1;
const genBit = () => testcheck.gen.intWithin(0, 1);

s.def('::bit', s.spec(isBit, {gen: genBit}));
s.exercise('::bit');
// [ [ 0, 0 ],
//   [ 1, 1 ],
//   ...
//   [ 1, 1 ] ]
```

