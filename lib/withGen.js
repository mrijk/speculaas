const {defaults, omit} = require('lodash');

const {spec: specize} = require('./def');

function withGen(spec, genFn) {
    return defaults(omit(specize(spec), 'gen'), {gen: genFn});
}

module.exports = withGen;
