const _ = require('lodash');

const {conform, invalidString} = require('./conform');
const {gen} = require('./gen');
const unform = require('./unform');

const describe = require('./util/describe');
const generate = require('./util/generate');

function _conform(specs, values) {
    for (let [head, rest] of generate(values)) {
        const [key, predicate] = _.head(specs);
        const conformHead = conform(predicate, head, true);

        if (conformHead !== invalidString) {
            const conformRest = _conform(_.tail(specs), rest);

            if (conformRest !== invalidString) {
                return _.merge({}, {[key]: conformHead}, conformRest);
            }
        }
    }
    return _.isEmpty(values) && _.isEmpty(specs) ? {} : invalidString;
}

function cat(...predicates) {
    const pairs = _.chunk(predicates, 2);

    return {
        op: 'cat',
        conform: _.partial(_conform, pairs),
        unform: values => pairs.map(([k, p]) => unform(p, values[k])),
        gen: () => pairs.map(([, p]) => gen(p)),
        describe: () => [cat.name, ...describe(predicates)],
        explain: function*(values, {via}) {
            yield* explainLength(values, pairs, via);
            yield* explainInvalid(values, pairs, via);
        }
    };
}

function* explainLength(values, specs, via) {
    // TODO: not correct for complicated cases. Use _conform
    if (values.length < specs.length) {
        const [key] = specs[values.length];
        yield {
            path: [key],
            reason: 'Insufficient input',
            pred: 'isString',
            val: undefined,
            via: [],
            'in': []
        };
    }
}

function* explainInvalid(values, specs, via) {
}

module.exports = cat;
