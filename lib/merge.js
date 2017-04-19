const _ = require('lodash');

const keys = require('./keys');
const {getSpec} = require('./def');

function merge(...predicates) {
    const {req, opt} = _.reduce(predicates,
                                ({req, opt}, p) => {
                                    const spec = getSpec(p);
                                    return {
                                        req: _.concat(req, spec.req),
                                        opt: _.concat(opt, spec.opt)
                                    };
                                },
                                {req: [], opt: []});
    return keys({req, opt});
}

module.exports = merge;
