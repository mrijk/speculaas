const _ = require('lodash');

function alt(...predicates) {
    return value => true;
}

module.exports = alt;
