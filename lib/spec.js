const {assert, checkAsserts, isCheckAsserts} = require('./assert');
const {def, getSpec, isSpec, registry, spec} = require('./def');
const {fdef} = require('./fdef');
const {gen} = require('./gen');
const {conform, invalidString} = require('./conform');
const {explain, explainStr} = require('./explain');
const {intIn, isIntInRange} = require('./intIn');
const {instIn, isInstInRange} = require('./instIn');

module.exports = {
    alt: require('./alt'),
    amp: require('./amp'),
    and: require('./and'),
    assert,
    cat: require('./cat'),
    checkAsserts,
    collOf: require('./collOf'),
    conform,
    conformer: require('./conformer'),
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
    instIn,
    intIn,
    invalidString,
    isCheckAsserts,
    isInstInRange,
    isIntInRange,
    isRegex: require('./isRegex'),
    isSpec,
    isValid: require('./isValid'),
    keys: require('./keys'),
    mapOf: require('./mapOf'),
    merge: require('./merge'),
    nilable: require('./nilable'),
    or: require('./or'),
    plus: require('./plus'),
    question: require('./question'),
    registry,
    spec,
    star: require('./star'),
    test: require('./test'),
    tuple: require('./tuple'),
    unform: require('./unform'),
    utils: require('./utils'),
    withGen: require('./withGen')
};
