multiSpec
=====

Usage: ```multiSpec(mm retag)```

Takes the name of a spec/predicate-returning multimethod and a
tag-restoring keyword or fn (retag).  Returns a spec that when
conforming or explaining data will pass it to the multimethod to get
an appropriate spec. You can e.g. use multiSpec to dynamically and
extensibly associate specs with 'tagged' data (i.e. data where one
of the fields indicates the shape of the rest of the structure).

[Source](https://github.com/mrijk/speculaas/blob/master/lib/multiSpec.js)

Note: NodeJS doesn't have multimethods, so you will have to use a library like
[genfun](https://www.npmjs.com/package/genfun) here.

Example:

```js
const s = require('speculaas');
```
