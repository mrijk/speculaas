// Sample spec for a game of cards

const _ = require('lodash');

const s = require('../lib/spec');

const isSuit = [':club', ':diamond', ':heart', ':spade'];
const isRank = _.range(2, 11).concat([':jack', ':queen', ':king', ':ace']);

