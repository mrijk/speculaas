const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const functions = require('./functions');
const {invalidString, unknownString} = require('./utils');

const defs = new Map();

function def(k, predicate) {
    return defs[k] = spec(predicate);
}

function conform(value, unwrap, predicate) {
    const val = unwrap ? value[0] : value;
    return predicate(val) ? val : invalidString;
}

function createArraySpec(predicate) {
    return {
        conform: (value, unwrap = false) => conform(value, unwrap, _.partial(_.includes, predicate)),
        describe: () => predicate,
        explain: function*(value) {
            if (!_.includes(predicate, value)) {
                yield getExplanation(value);
            }
        },
        gen: () => tcg.null.then(() => tcg.return(_.sample(predicate)))
    };
}

function createFunctionSpec(predicate, gen) {
    return {
        conform: (value, unwrap = false) => conform(value, unwrap, predicate),
        unform: _.identify,
        explain: function*(value, options) {
            options.pred = _.isEmpty(predicate.name) || predicate.name === 'anonymous' ? `${predicate}` : predicate.name;
            if (!predicate(value)) {
                yield getExplanation(value, options);
            }
        },
        gen: gen ? gen : () => functions.gen(predicate)
    };
}

function getExplanation(value, {path, pred = unknownString, via}) {
    return {
        path,
        pred,
        val: value,
        via,
        'in': []
    };
}

function createObjectSpec(predicate, gen) {
    if (isSpec(predicate)) {
        return predicate;
    } else {
        return {
            conform: (value, unwrap = false) => conform(value, unwrap, _.partial(_.has, predicate)),
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
    
