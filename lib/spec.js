const {assert, checkAsserts, isCheckAsserts} = require('./assert');
const {def, getSpec} = require('./def');
const {gen} = require('./gen');
const {conform, invalidString} = require('./conform');
const {explain, explainStr} = require('./explain');
const {intIn, isIntInRange} = require('./intIn');

module.exports = {
    alt: require('./alt'),
    amp: require('./amp'),
    and: require('./and'),
    assert,
    cat: require('./cat'),
    checkAsserts,
    collOf: require('./collOf'),
    conform,
    def,
    describe: require('./describe'),
    doubleIn: require('./doubleIn'),
    exercise: require('./exercise'),
    explain,
    explainStr,
    fdef: require('./fdef'),
    gen,
    getSpec,
    intIn,
    invalidString,
    isCheckAsserts,
    isIntInRange,
    isValid: require('./isValid'),
    keys: require('./keys'),
    mapOf: require('./mapOf'),
    merge: require('./merge'),
    nilable: require('./nilable'),
    or: require('./or'),
    plus: require('./plus'),
    question: require('./question'),
    star: require('./star'),
    tuple: require('./tuple')
};
