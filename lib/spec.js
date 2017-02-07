const _ = require('lodash');

const functions = require('./functions');
const {def, getSpec} = require('./def');
const {conform, invalidString} = require('./conform');
const {explain, explainStr} = require('./explain');
const {intIn, isIntInRange} = require('./intIn');
const isValid = require('./isValid');

let _checkAsserts = false;

function assert(spec, value) {
    if (_checkAsserts) {
        if (isValid(spec, value)) {
            return value;
        } else {
            throw new Error('Spec assertion failed');
        }
    } else {
        return value;
    }
}

function cat(...predicates) {
    return {
        conform: values => values.length === predicates.length / 2 &&
            _.zip(_.chunk(predicates, 2), values).every(([[, p], v]) => isValid(p, v))
    };
}

function checkAsserts(check) {
    return _checkAsserts = check;
}

function isCheckAsserts() {
    return _checkAsserts;
}

function fdef(fnSym, {args, ret, fn}) {
}

function gen(spec) {
    if (_.isFunction(spec)) {
        return functions.gen(spec);
    } else {
        return null;
    }
}

module.exports = {
    alt: require('./alt'),
    amp: require('./amp'),
    and: require('./and'),
    assert,
    cat,
    checkAsserts,
    collOf: require('./collOf'),
    conform,
    def,
    doubleIn: require('./doubleIn'),
    explain,
    explainStr,
    fdef,
    gen,
    getSpec,
    intIn,
    invalidString,
    isCheckAsserts,
    isIntInRange,
    isValid,
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
