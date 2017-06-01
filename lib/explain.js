const explainData = require('./explainData');

function explain(spec, value) {
    process.stdout.write(explainStr(spec, value));
}

function explainStr(spec, value) {
    const explanation = explainData(spec, value);
    if (explanation == null) {
        return 'Success!\n';        
    } else {
        return `val: ${value} fails predicate: :even? predicate: ${spec}\n`;
    }
}

module.exports = {
    explain,
    explainStr
};
