exerciseFn
=====

Usage: ```excerciseFn(sym)```

Exercises the fn named by sym (a symbol) by applying it to
n (default 10) generated samples of its args spec. When fspec is
supplied its arg spec is used, and symOrF can be a fn.  Returns a
sequence of tuples of [args, ret].

[Source](https://github.com/mrijk/speculaas/blob/master/lib/excercise.js)

Example:

```js
const s = require('speculaas');
const {isBoolean, isString} = s.utils;
```
