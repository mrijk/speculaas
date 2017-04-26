const _ = require('lodash');

function withGen(spec, genFn) {
    return _.defaults(_.omit(spec, 'gen'), {gen: genFn});
}

module.exports = withGen;
