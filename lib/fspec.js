function fspec(options) {
    const {args, ret, fn} = options;
    return {
        args,
        ret,
        fn,
        conform: values => {
            // TODO: check if values is a function that conforms to this spec
            return values;
        }
    }
}

module.exports = fspec;
