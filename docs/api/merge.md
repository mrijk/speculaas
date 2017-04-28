merge
=====

Usage: ```merge([...predForms])```

Takes map-validating specs (e.g. 'keys' specs) and
returns a spec that returns a conformed map satisfying all of the
specs.  Unlike 'and', merge can generate maps satisfying the
union of the predicates.

[Source](https://github.com/mrijk/speculaas/blob/master/lib/merge.js)

Example:

```js
const s = require('speculaas');
const {isBoolean, isString} = s.utils;

// Specs for an animal
s.def(':animal/kind', isString);
s.def(':animal/says', isString);
s.def(':animal/common', s.keys({req: [':animal/kind', ':animal/says']}));

// Specs for a dog
s.def(':dog/tail?', isBoolean);
s.def(':dog/breed', isString);

s.def(':animal/dog', s.merge(':animal/common', s.keys({req: [':dog/tail?', ':dog/breed']})));
    
const doggy = {
    ':animal/kind': 'dog',
    ':animal/says': 'woof',
    ':dog/tail?': true,
    ':dog/breed': 'retriever'
};

s.isValid(':animal/dog', doggy);
// true
```
