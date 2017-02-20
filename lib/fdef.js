const defs = {};

function fdef(fnSym, options) {
    const {args, ret, fn} = options;
    defs[fnSym.name] = options;
}

function specs(fnSym) {
    return defs[fnSym.name];
}

module.exports = {
    fdef,
    specs
};
