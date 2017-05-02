fspec
=====

Usage: ```fspec([options])```

Takes :args :ret and (optional) :fn kwargs whose values are preds
and returns a spec whose conform/explain take a fn and validates it
using generative testing. The conformed value is always the fn itself.

See 'fdef' for a single operation that creates an fspec and
registers it, as well as a full description of :args, :ret and :fn

fspecs can generate functions that validate the arguments and
fabricate a return value compliant with the :ret spec, ignoring
the :fn spec if present.

Optionally takes :gen generator-fn, which must be a fn of no args
that returns a test.check generator.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/fspec.js)

Example:

```js
const s = require('speculaas');
const {invalidString, isInteger} = s.utils;
```
