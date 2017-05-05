const {conform, invalidString} = require('./conform');

function multiSpec(mm, retag) {
    return {
        conform: value => {
            try {
                const spec = mm(value[retag]);
                return conform(spec, value);
            } catch (err) {
                return invalidString;
            }
        }
    };
}

module.exports = multiSpec;
