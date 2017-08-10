// Fix me: implementation of keys*
// Maybe we can merge this later with keys and use multimethods based on the input

function keysStar({req = [], opt = []}) {
    return {
        op: 'keysStar',
        req,
        opt,
        conform: value => value
    };
}

module.exports = keysStar;
