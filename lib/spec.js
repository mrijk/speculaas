const {assert, checkAsserts, isCheckAsserts} = require('./assert');
const {def, getSpec, isSpec} = require('./def');
const {fdef} = require('./fdef');
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
    every: require('./every'),
    everyKv: require('./everyKv'),
    exercise: require('./exercise'),
    exerciseFn: require('./exerciseFn'),
    explain,
    explainStr,
    fdef,
    gen,
    getSpec,
    intIn,
    invalidString,
    isCheckAsserts,
    isIntInRange,
    isSpec,
    isValid: require('./isValid'),
    keys: require('./keys'),
    mapOf: require('./mapOf'),
    merge: require('./merge'),
    nilable: require('./nilable'),
    or: require('./or'),
    plus: require('./plus'),
    question: require('./question'),
    star: require('./star'),
    test: require('./test'),
    tuple: require('./tuple'),
    utils: require('./utils')
};
