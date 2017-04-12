nilable
=====

Usage: ```nilable(pred)```

Returns a spec that accepts null and values satisfying pred.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/nilable.js)

Example:

```js
const s = require('speculaas');
const {isString} = require('lodash');

s.isValid(isString, null);
// false

s.isValid(s.nilable(isString), 'foobar');
// true

s.isValid(s.nilable(isString), null);
// true

```
