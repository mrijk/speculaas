registry
=====

Usage: ```registry()```

Returns the registry map, prefer ['getSpec'](getSpec.md) to lookup a spec by name

[Source](https://github.com/mrijk/speculaas/blob/master/lib/def.js)

Example:

```js
const s = require('speculaas');

for (var [key, value] of s.registry()) {
    console.log(key + " = " value);
}
```
