keys
=====

Usage: ```keys(...)```

Creates and returns a map validating spec.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/keys.js)

Example:

```js
const s = require('speculaas');
const {isBoolean, isString} = s.utils;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/

s.def('::email-type', s.and(isString, s => emailRegex.test(s)));
        
s.def('::first-name', isString);
s.def('::last-name', isString);
s.def('::email', '::email-type');
s.def('::phone', isString);

// First name, last name and email are required. Phone number is optional
s.def('::person', s.keys({req: ['::first-name', '::last-name', '::email'], opt: ['::phone']}));

s.isValid('::person',
{
    '::first-name': 'Elon',
    '::last-name': 'Musk',
    '::email': 'elon@example.com'
});
// true
```
