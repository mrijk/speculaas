const {invalidString} = require('./conform');
const isValid = require('./isValid');

function multiSpec(mm, retag) {
    return {
        conform: value => {
            const spec = mm(value[retag]);
            return isValid(spec, value) ? value : invalidString;
        }
    };
}

module.exports = multiSpec;
