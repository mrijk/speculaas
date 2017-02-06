const _ = require('lodash');

function or(...predicates) {
    return {
        conform: value => {
            const found = _.find(_.chunk(predicates, 2), ([, predicate]) => predicate(value));
            return _.isUndefined(found) ? null : [found[0], value];
        }
    };
}

module.exports = or;
