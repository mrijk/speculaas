const _ = require('lodash');

const {gen: tcg} = require('testcheck');

const {invalidString} = require('./conform');
const explainData = require('./explainData');
const {gen} = require('./gen');

const isValid = require('./isValid');

const describe = require('./util/describe');

const describeKeys = (label, keys) => _.isEmpty(keys) ? [] : [label, describe(keys)];
const describeReqKeys = _.partial(describeKeys, 'req');
const describeOptKeys = _.partial(describeKeys, 'opt');

function keys({req = [], opt = []}) {
    return {
        req,
        opt,
        conform: value => (
            _.every(req, key => isValidRequiredKey(value, key)) &&
                _.every(opt, key => isValidOptionalKey(value, key))) ? value : invalidString,
        unform: _.identity,
        gen: () => tcg.null.then(() => createGeneratorObject(createKeys(req, opt))),
        describe: () => [keys.name, ...describeReqKeys(req), ...describeOptKeys(opt)],
        explain: function*(value, {via}) {
            yield* explainInvalid(value, req, via, true);
            yield* explainInvalid(value, opt, via, false);
        }
    };
}

function* explainInvalid(val, keys, via, required) {    
    for (let key of keys) {
        if (val[key]) {
            const expl = explainData(key, val[key], {via, _in: [key]});
            if (expl) {
                yield expl.problems[0];
            }
        } else if (required) {
            yield {
                path: [],
                pred: key,
                val,
                via,
                'in': []
            };
        }
    }
}

function createKeys(req, opt) {
    return _.concat(req, _.sampleSize(opt, _.random(opt.length)));
}

function createGeneratorObject(keys) {
    return _.zipObject(keys, _.map(keys, gen));
}

function isValidOptionalKey(value, key) {
    return !_.has(value, key) || isValid(key, value[key]);
}

function isValidRequiredKey(value, key) {
    return _.has(value, key) && isValid(key, value[key]);
}

module.exports = keys;
