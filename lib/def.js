const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

const functions = require('./functions');

const defs = {};

function def(spec, predicate) {
    let entry = predicate;
    if (_.isArray(predicate)) {
        entry = createArraySpec(predicate);
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

function getSpec(p) {
    if (_.isString(p) || _.isSymbol(p)) {
        return defs[p];
    } else if (_.isObject(p)) {
        return p;
    } else {
        return null;
    }
}

module.exports = {
    def,
    getSpec
};
    
