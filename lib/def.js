const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const functions = require('./functions');
const {invalidString} = require('./utils');

const defs = new Map();

function def(k, predicate) {
    return defs[k] = spec(predicate);
}

function createArraySpec(predicate) {
    return {
        conform: value => _.includes(predicate, value) ? value : invalidString,
        describe: () => predicate,
        gen: () => tcg.null.then(() => tcg.return(_.sample(predicate)))
    };
}

function createFunctionSpec(predicate, gen) {
    return {
        conform: (value, unwrap = false) => {
            const val = unwrap ? value[0] : value;
            return predicate(val) ? val : invalidString;
        },
        unform: _.identify,
        gen: gen ? gen : () => functions.gen(predicate)
    };
}

function createObjectSpec(predicate, gen) {
    if (isSpec(predicate)) {
        return predicate;
    } else {
        return {
            conform: value => _.has(predicate, value) ? value : invalidString,
            unform: _.identity,
            gen
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

function spec(form, {gen} = {}) {
    const lookup = [
        [_.isArray, createArraySpec],
        [_.isPlainObject, createObjectSpec],
        [_.isString, getSpec],
        [_.isSymbol, getSpec],
        [_.isFunction, createFunctionSpec]];
    const [, action] = _.find(lookup, ([match]) => match(form));
    return action(form, gen);
}

module.exports = {
    def,
    getSpec,
    isSpec,
    registry,
    spec
};
    
