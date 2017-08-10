const {spec: specize} = require('./def');

function unform(pred, value) {
    const predicate = specize(pred).unform;
    return predicate ? predicate(value) : value;
}

module.exports = unform;
