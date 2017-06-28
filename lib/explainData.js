const _ = require('lodash');

const {spec: specize} = require('./def');
const {isString} = require('./utils');

function explainData(spec, value, {path =  [], via = [], _in = []} = {}) {
    const lookup = specize(spec);
    if (lookup) {
        const name = specName(spec);
        const viaOut = _.isUndefined(name) ? via : [...via, name];
        const problems = [...lookup.explain(value, {path, pred: name, via: viaOut, _in})];
        return _.isEmpty(problems) ? null : {problems};
    } else {
        throw new Error(`Unable to resolve spec ${spec}`);
    }
}

function specName(spec) {
    if (isString(spec)) {
        return spec;
    } else {
        return undefined;
    }
}

function* firstProblem(spec, value, options) {
    const expl = explainData(spec, value, options);
    if (expl) {
        yield expl.problems[0];
    }
}

module.exports = {
    explainData,
    firstProblem
};
