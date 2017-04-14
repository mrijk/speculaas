const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

const functions = require('./functions');

const defs = {};

function def(spec, predicate) {
    let entry = predicate;
    if (_.isArray(predicate)) {
        entry = createArraySpec(predicate);
    } else if (_.isPlainObject(predicate)) {
        entry = createObjectSpec(predicate);
    } else if (_.isString(predicate)) {
        // Reference to another existing spec
        entry = defs[predicate];
    } else if (_.isFunction(predicate)) {
        entry = createFunctionSpec(predicate);
    }
    defs[spec] = entry;
}

function createArraySpec(predicate) {
    return {
        conform: value => _.includes(predicate, value),
        gen: () => tcg.bind(tcg.null, () => tcg.return(_.sample(predicate)))
    };
}

function createFunctionSpec(predicate) {
    return {
        conform: predicate,
        gen: () => functions.gen(predicate)
    };
}

function createObjectSpec(predicate) {
    if (isSpec(predicate)) {
        return predicate;
    } else {
        return {
            conform: value => _.has(predicate, value)
        };
    }
}

function isSpec({conform}) {
    return _.isFunction(conform);
}

function getSpec(p) {
    if (_.isString(p) || _.isSymbol(p)) {
        return defs[p];
    } else if (_.isObject(p) && !_.isArray(p)) {
        return p;
    } else {
        return undefined;
    }
}

module.exports = {
    def,
    getSpec
};
    
