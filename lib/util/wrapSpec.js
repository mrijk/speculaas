function wrapSpec(spec, funcName, f) {
    const handler = {
        get(target, propKey) {
            const origMethod = target[propKey];
            if (propKey === funcName  ) {
                return (...args) => f(origMethod.apply(this, args));
            }
            return origMethod;
        }
    };

    return new Proxy(spec, handler);
}

module.exports = wrapSpec;
