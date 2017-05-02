// Example: Living the lean startup with clojure.spec. Node.spec implementation
// of http://blog.cognitect.com/blog/2017/3/24/3xeif9bxaom78qyzwssgwz1leuorh4
// Blog by Carin Meier

const _ = require('lodash');

const s = require('../lib/spec');
const stest = require('../lib/test');

const {isString} = s.utils;

const sampleNames = ["Arlena", "Ilona", "Randi", "Doreatha", "Shayne"];

s.def('::name', s.withGen(
    x => isString(x) && !_.isEmpty(x), 
    () => s.gen(sampleNames)));

console.log(_.head(s.exercise('::name')));
