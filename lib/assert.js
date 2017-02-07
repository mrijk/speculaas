const isValid = require('./isValid');

let _checkAsserts = false;

function assert(spec, value) {
    if (_checkAsserts) {
        if (isValid(spec, value)) {
            return value;
        } else {
            throw new Error('Spec assertion failed');
        }
    } else {
        return value;
    }
}

function checkAsserts(check) {
    return _checkAsserts = check;
}

function isCheckAsserts() {
    return _checkAsserts;
}

module.exports = {
    assert,
    checkAsserts,
    isCheckAsserts
};
