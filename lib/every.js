const _ = require('lodash');

const collOf = require('./collOf');

const wrapSpec = require('./util/wrapSpec');

function every(predicate, options = {}) {
    // OK for the time being to use collOf
    return wrapSpec(collOf(predicate, options), 'describe', description => [every.name, ..._.tail(description)]);
}

module.exports = every;
