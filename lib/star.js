const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {conform, invalidString} = require('./conform');
const {gen} = require('./gen');

const generate = require('./util/generate');

function _conform(spec, values) {
    for (let [head, rest] of generate(values)) {
        const conformHead = conform(spec, head, true);
        if (conformHead !== invalidString) {
            const conformRest = _conform(spec, rest);
            if (conformRest !== invalidString) {
                return _.concat(conformHead, conformRest);
            }
        }
    }
    return _.isEmpty(values) ? values : invalidString;
}

function star(spec) {
    return {
        op: 'star',
        conform: _.partial(_conform, spec),
        unform: _.identity,
        gen: () => tcg.null.then(() => tcg.array(gen(spec), {size: _.random(0, 5)}))
    };
}

module.exports = star;
