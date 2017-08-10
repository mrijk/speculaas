const {spec: specize} = require('./def');

function form(spec) {
    const lookup = specize(spec);
    if (lookup) {
        return [];
    } else {
        throw new Error(`Unable to resolve spec ${spec}`);
    }
}

module.exports = form;
