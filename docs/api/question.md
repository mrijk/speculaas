question
=====

Usage: ```question(predForm)```

Returns a regex op that matches zero or one value matching
pred. Produces a single value (not a collection) if matched.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/question.js)

Example:

```js
const s = require('speculaas');
const {isInteger, isOdd} = s.utils;

s.def('::odd?', s.and(isInteger, isOdd));
const odds = s.question('::odd?');

s.isValid(odds, [1]);
// true

s.isValid(odds, [1, 3]);
// false
```
