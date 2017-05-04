const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./utils');
const createFunctionSpec = require('./conformer');
// const conformer = require('./conformer');

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

/*
function createFunctionSpec(predicate) {
    return conformer(value => predicate(value) ? value : invalidString);
}
*/

function createObjectSpec(predicate) {
    if (isSpec(predicate)) {
        return predicate;
    } else {
        return {
            conform: value => _.has(predicate, value) ? value : invalidString
        };
    }
}

function isSpec(predicate) {
    return _.isFunction(predicate.conform) ? predicate : null;
}

function getSpec(p) {
    if (_.isString(p) || _.isSymbol(p)) {
        return defs[p];
/*
        if (!spec) {
            throw new Error(`Unable to resolve spec ${spec}`);
        }
        return spec;
*/
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
        [_.isSymbol, getSpec],
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
    
