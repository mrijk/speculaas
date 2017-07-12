const defs = new Map();

function fdef(fnSym, options) {
    defs[fnSym.name] = options;
}

function specs(fnSym) {
    return defs[fnSym.name];
}

module.exports = {
    fdef,
    specs
};
