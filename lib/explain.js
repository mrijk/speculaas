const isValid = require('./isValid');

function explain(spec, value) {
    console.log(explainStr(spec, value));
}

function explainStr(spec, value) {
    if (isValid(spec, value)) {
        return 'Success!\n';
    } else {
        return `val: ${value} fails predicate: :even? predicate: ${spec}\n`;
    }
}

module.exports = {
    explain,
    explainData: explainStr,
    explainStr
};
