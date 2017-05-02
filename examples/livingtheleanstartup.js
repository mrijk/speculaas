// Example: Living the lean startup with clojure.spec. Node.spec implementation
// of http://blog.cognitect.com/blog/2017/3/24/3xeif9bxaom78qyzwssgwz1leuorh4
// Blog by Carin Meier

const _ = require('lodash');

const s = require('../lib/spec');
const stest = require('../lib/test');

const {isInt, isString} = s.utils;

const sampleNames = ["Arlena", "Ilona", "Randi", "Doreatha", "Shayne"];

s.def('::name', s.withGen(
    x => isString(x) && !_.isEmpty(x), 
    () => s.gen(sampleNames)));

_.head(s.exercise('::name'));

s.def('::id', isInt);

function isState(s) {
    const isUpperCase = c => _.upperCase(c) === c;
    return _.filter(s, isUpperCase).length === 2;
}

s.def('::state', s.and(isString, isState));
s.def('::customer', s.keys({req: ['::id', '::name', '::state']}));
s.def('::customers', s.collOf('::customer'));

function validate(spec, value, message) {
    if (!s.isValid(spec, value)) {
        throw new Error(message, s.explainData(spec, value));
    }
}

validate('::customers', [{':id': 1, ':name': 'Susan', ':state': 'OH'}], 'Bad Customers');
