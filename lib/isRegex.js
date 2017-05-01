function isRegex(spec) {
    return (spec && spec.op) ? spec : null;
}

module.exports = isRegex;


