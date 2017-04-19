const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

const functions = require('./functions');

const defs = new Map();

function def(spec, predicate) {
    const lookup = [
        [_.isArray, createArraySpec],
        [_.isPlainObject, createObjectSpec],
        [_.isString, getSpec],
        [_.isFunction, createFunctionSpec]];
    const [, action] = _.find(lookup, ([match]) => match(predicate));
    return defs[spec] = action(predicate);
}

function createArraySpec(predicate) {
    return {
        conform: value => _.includes(predicate, value),
        describe: () => predicate,
        gen: () => tcg.bind(tcg.null, () => tcg.return(_.sample(predicate)))
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

function isSpec(predicate) {
    return _.isFunction(predicate.conform) ? predicate : null;
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
    } else if (_.isObject(p) && !_.isArray(p)) {
        return p;
    } else {
        return undefined;
    }
}

function registry() {
    return defs;
}

module.exports = {
    def,
    getSpec,
    isSpec,
    registry
};
    
