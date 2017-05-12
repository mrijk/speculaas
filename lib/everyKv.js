const _ = require('lodash');

const mapOf = require('./mapOf');

const wrapSpec = require('./util/wrapSpec');

function everyKv(predicate, options = {}) {
    // OK for the time being
    return wrapSpec(mapOf(predicate, options), 'describe', description => [everyKv.name, ..._.tail(description)]);
}

module.exports = everyKv;
