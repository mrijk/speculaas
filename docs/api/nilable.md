nilable
=====

Usage: ```nilable(pred)```

Returns a spec that accepts null and values satisfying pred.

Example:

```js
const s = require('speculaas');

const {isString} = require('lodash');

assert(s.isValid(isString, null));
// throws "AssertionError: false == true"

assert(s.isValid(s.nilable(isString), 'foobar'));
// OK

assert(s.isValid(s.nilable(isString), null));
// OK

```
