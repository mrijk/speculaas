spec
=====

Usage: ```spec(form)```

Takes a single predicate form, e.g. can be the name of a predicate,
like ```isEven```, or a fn literal like ```x => x < 42```. Note that it is not
generally necessary to wrap predicates in spec when using the rest
of the spec macros, only to attach a unique generator

[Source](https://github.com/mrijk/speculaas/blob/master/lib/def.js)

Example:

```js
const s = require('speculaas');

s.isValid(s.spec(x => x < 42), 13);
// true
```
