const _ = require('lodash');

const {conform, invalidString} = require('./conform');
const {explainData} = require('./explainData');
const {gen} = require('./gen');
const unform = require('./unform');

const describe = require('./util/describe');

function and(...predicates) {
    return {
        conform: _.partial(_conform, predicates),
        unform: value => unform(predicates[0], value),
        gen: () => gen(predicates[0]),
        describe: () => [and.name, ...describe(predicates)],
        explain: function*(value, options) {
            yield* explainInvalid(value, predicates, options);
        }
    };
}

function _conform(predicates, value, unwrap) {
    let allValid = true;

    const results = _.reduce(predicates, (result, p) => {
        const val = conform(p, result, unwrap);

        allValid = allValid && (val !== invalidString);

        return _.isObject(val) ? val : result;
    }, value);

    return allValid ? results : invalidString;
}

function* explainInvalid(value, predicates, options) {
    const problems = _.map(predicates, predicate => explainData(predicate, value, options));
    const found = _.find(problems, p => !_.isNull(p));
    if (found) {
        yield found.problems[0];
    }
}

module.exports = and;
