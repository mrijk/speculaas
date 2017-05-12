const _ = require('lodash');

const collOf = require('./collOf');

function every(predicate, options = {}) {
    // OK for the time being to use collOf
    const handler = {
        get(target, propKey) {
            const origMethod = target[propKey];
            if (propKey === 'describe') {
                return (...args) => {
                    const description = origMethod.apply(this, args);
                    return [every.name, ..._.tail(description)];
                }
            }
            return origMethod;
        }
    };
    return new Proxy(collOf(predicate, options), handler);
}

module.exports = every;
