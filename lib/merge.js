const _ = require('lodash');

const describe = require('./util/describe');
const keys = require('./keys');
const {getSpec} = require('./def');

const wrapSpec = require('./util/wrapSpec');

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
    const spec = keys({req, opt});
    return wrapSpec(spec, 'describe', () => [merge.name, ...describe(predicates)]);
}

module.exports = merge;
