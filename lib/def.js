const _ = require('lodash');

const testcheck = require('testcheck');
const tcg = testcheck.gen;

const createFunctionSpec = require('./conformer');

const defs = new Map();

function def(k, predicate) {
    return defs[k] = spec(predicate);
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

function spec(form) {
    const lookup = [
        [_.isArray, createArraySpec],
        [_.isPlainObject, createObjectSpec],
        [_.isString, getSpec],
        [_.isFunction, createFunctionSpec]];
    const [, action] = _.find(lookup, ([match]) => match(form));
    return action(form);
}

module.exports = {
    def,
    getSpec,
    isSpec,
    registry,
    spec
};
    
