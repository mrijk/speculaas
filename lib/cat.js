const _ = require('lodash');

const {conform, invalidString} = require('./conform');
const {gen} = require('./gen');
const unform = require('./unform');

function* generate(array) {
    const len = array.length;
    for (let n = 1; n <= len; n++) {
        yield [_.take(array, n), _.takeRight(array, len - n)];
    }
}

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
        gen: () => pairs.map(([, p]) => gen(p))
    };
}

module.exports = cat;
