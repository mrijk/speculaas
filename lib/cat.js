const _ = require('lodash');

const {conform, invalidString} = require('./conform');
const {firstProblem} = require('./explainData');
const {gen} = require('./gen');
const unform = require('./unform');
const isValid = require('./isValid');

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
            via,
            'in': []
        };
    }
}

function* explainInvalid(values, specs, via) {
    if (values.length !== specs.length) return;

    // Looks a lot like implementation of Tuple!
    const pairs = _.zip(specs, values);
    const isInvalid = ([[, spec], value]) => !isValid(spec, value);
    const index = _.findIndex(pairs, isInvalid);
    if (index !== -1) {
        const [[key, spec], val] = pairs[index];
        yield* firstProblem(spec, val, {path: [key], via, _in: [index]});
    }
}

module.exports = cat;
