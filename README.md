[![Build Status](https://travis-ci.org/mrijk/speculaas.svg)](https://travis-ci.org/mrijk/speculaas)
[![Coverage Status](https://coveralls.io/repos/github/mrijk/speculaas/badge.svg?branch=master)](https://coveralls.io/github/mrijk/speculaas?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/npm/speculaas/badge.svg)](https://snyk.io/test/npm/speculaas)
[![npm version](https://badge.fury.io/js/speculaas.svg)](https://badge.fury.io/js/speculaas)

Speculaas 
======

NodeJS version of [clojure.spec](http://clojure.org/about/spec)

## Installation

`npm install speculaas`

## Example

```js
const s = require('speculaas');
const {isString} = s.utils;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/

s.def('emailType', s.and(isString, s => emailRegex.test(s)));
        
s.def('first-name', isString);
s.def('last-name', isString);
s.def('email', 'emailType');
s.def('phone', isString);

// First name, last name and email are required. Phone number is optional
s.def('person', s.keys({req: ['first-name', 'last-name', 'email'], opt: ['phone']}));

s.isValid('::person',
{
    'first-name': 'Elon',
    'last-name': 'Musk',
    'email': 'elon@example.com'
});
// true
```

## Usage

[Documentation](https://mrijk.github.io/speculaas) is in progress.

## Tests

Unit tests:

`npm test`

Test coverage:

`npm run cover`

Run [ESlint](http://eslint.org):

`npm run lint`

## FAQ

Q: what kind of a silly name is speculaas?

A: [nodespec](https://www.npmjs.com/package/nodespec) and [node-spec](https://www.npmjs.com/package/node-spec) were already taken. [Speculaas](https://en.wikipedia.org/wiki/Speculaas) is a kind of a Dutch/Belgium biscuit.

Q: any alternatives for your code?

A: for an alternative look at [js.spec](http://js-spec.online)

## Contributing

If you want to contribute, you are more than welcome!
