const _ = require('lodash');

const {gen} = require('testcheck');

const defs = {};

function def(spec, predicate) {
    let entry = predicate;
    if (_.isArray(predicate)) {
        entry = createArraySpec(predicate);
    } else if (_.isString(predicate)) {
        // Reference to another existing spec
        entry = defs[predicate];
    } else if (_.isFunction(predicate)) {
        entry = {
            conform: predicate
        };
    }
    defs[spec] = entry;
}

function createArraySpec(predicate) {
    return {
        conform: value => _.includes(predicate, value),
        gen: () => gen.bind(gen.null, () => gen.return(_.sample(predicate)))
    };
}

function getSpec(p) {
    if (_.isString(p)) {
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
    
