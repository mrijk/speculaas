const {invalidString} = require('./conform');
const isValid = require('./isValid');

function multiSpec(mm, retag) {
    return {
        conform: value => {
            try {
                const spec = mm(value[retag]);
                return isValid(spec, value) ? value : invalidString;
            } catch (err) {
                return invalidString;
            }
        }
    };
}

module.exports = multiSpec;
