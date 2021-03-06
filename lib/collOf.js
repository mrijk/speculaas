const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');
const {explainData} = require('./explainData');
const {gen} = require('./gen');
const {checkCount} = require('./util/helper');
const isValid = require('./isValid');

const describe = require('./util/describe');

function collOf(predicate, options = {}) {
    const {kind = _.stubTrue, distinct = false, into} = options;
    const uniq = value => !distinct || isUnique(value);

    return {
        conform: value => {
            const result = kind(value) && uniq(value) && checkCount(value, options)
                  && _.every(value, v => isValid(predicate, v));
            return result ? transform(value, into) : invalidString;
        },
        unform: _.identity,
        gen: () => tcg.null.then(() => tcg.array(gen(predicate), {size: options.count})),
        describe: () => [collOf.name, ...describe([predicate]), ...describe(_.flatten(_.toPairs(options)))],
        explain: function*(values, {via}) {
            yield* explainCount(values, options, via);
            yield* explainInvalid(values, predicate, via);
        }
    };
}

function* explainCount(values, {count, minCount, maxCount} = {}, via) {
    if (count) {
        const f = new Function('', `return values => values.length === ${count}`)();
        if (!f(values)) {
            yield {
                path: [],
                pred: `${f}`,
                val: values,
                via,
                'in': []
            };
        }
    }
}

function* explainInvalid([v, ...rest], predicate, via, index = 0) {
    if (v) {
        if (!isValid(predicate, v)) {
            yield explainData(predicate, v, {via, _in: [index]}).problems[0];
        }
        index++;
        yield* explainInvalid(rest, predicate, via, index);
    }
}

function isUnique(value) {
    return _.uniq(value).length === value.length;
}

function transform(value, into) {
    if (_.isSet(into)) {
        return new Set(value);
    } else if (_.isArray(into)) {
        return [...value];
    }
    return value;
}

module.exports = collOf;
