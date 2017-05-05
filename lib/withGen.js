const _ = require('lodash');

const {spec: specize} = require('./def');

function withGen(spec, genFn) {
    return _.defaults(_.omit(specize(spec), 'gen'), {gen: genFn});
}

module.exports = withGen;
