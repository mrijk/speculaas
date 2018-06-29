// Example: Living the lean startup with clojure.spec. Node.spec implementation
// of http://blog.cognitect.com/blog/2017/3/24/3xeif9bxaom78qyzwssgwz1leuorh4
// Blog by Carin Meier

const {filter, head, isEmpty, upperCase} = require('lodash');

const s = require('../lib/spec');

const {isInt, isString} = s.utils;

const sampleNames = ['Arlena', 'Ilona', 'Randi', 'Doreatha', 'Shayne'];

s.def('::name', s.withGen(
    x => isString(x) && !isEmpty(x), 
    () => s.gen(sampleNames)));

head(s.exercise('::name'));

s.def('::id', isInt);

function isState(s) {
    const isUpperCase = c => upperCase(c) === c;
    return filter(s, isUpperCase).length === 2;
}

s.def('::state', s.and(isString, isState));
s.def('::customer', s.keys({req: ['::id', '::name', '::state']}));
s.def('::customers', s.collOf('::customer'));

function validate(spec, value, message) {
    if (!s.isValid(spec, value)) {
        throw new Error(message + '\n' + s.explainData(spec, value));
    }
}

// Todo: original example uses req-un and ':id'. Is this useful in NodeJS context?
validate('::customers', [{'::id': 1, '::name': 'Susan', '::state': 'OH'},
                         {'::id': 2, '::name': 'Brian', '::state': 'CA'}], 'Bad Customers');

validate('::customers', [{'::id': 1, '::name': 'Susan', '::state': 'OH'},
                         {'::id': 2, '::name': 'Brian'}], 'Bad Customers');
