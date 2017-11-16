One Fish Spec Fish
===

This is a speculaas implementation of 
[One Fish Spec Fish](http://gigasquidsoftware.com/blog/2016/05/29/one-fish-spec-fish/), a blog post by 
Carin Meier. The original version uses [clojure.spec](http://clojure.org/about/spec).

In a number of occasions where the translation was not straightforward, I have inserted the original
Clojure code as a comment.

```js
const _ = require('lodash');
const s = require('speculaas');

const {isString} = s.utils;

const fishNumbers = {0: 'Zero',
                     1: 'One',
                     2: 'Two'};

// Clojure: (s/def ::fish-number (set (keys fish-numbers)))
s.def('::fish-number', _.keys(fishNumbers).map(_.toInteger));

s.isValid('::fish-number', 1);  // => true
s.isValid('::fish-number', 5);  // => false

s.explain('::fish-number', 5);

s.def('::color', ['Red', 'Blue', 'Dun']);

s.def('::first-line', s.cat(':n1', '::fish-number', ':n2', '::fish-number', 'c1', '::color', 'c2', '::color'));

s.explain('::first-line', [1, 2, 'Red', 'Black']);

```
