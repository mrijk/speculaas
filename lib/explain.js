const {explainData} = require('./explainData');

function explain(spec, value) {
    process.stdout.write(explainStr(spec, value));
}

function explainStr(spec, value) {
    const explanation = explainData(spec, value);
    if (explanation == null) {
        return 'Success!\n';        
    } else {
        const {via, pred, reason} = explanation.problems[0];
        const specString = via[0] ? `spec: ${via[0]} ` : '';
        const reasonString = reason ? `, ${reason}` : '';
        return `val: ${value} fails ${specString}predicate: ${pred}${reasonString}\n`;
    }
}

module.exports = {
    explain,
    explainStr
};
