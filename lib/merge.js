const _ = require('lodash');

const keys = require('./keys');
const {getSpec} = require('./def');

function merge(...predicates) {
    const {req, opt} = _.reduce(predicates,
                                ({req, opt}, p) => {
                                    const spec = _getSpec(p);
                                    return {
                                        req: _.concat(req, spec.req),
                                        opt: _.concat(opt, spec.opt)
                                    };
                                },
                                {req: [], opt: []});
    return keys({req, opt});
}

function _getSpec(p) {
    if (_.isString(p)) {
        return getSpec(p);
    } else if (_.isObject(p)) {
        return p;
    } else {
        return null;
    }
}

module.exports = merge;
