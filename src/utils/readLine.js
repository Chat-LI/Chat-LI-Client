const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const util = require('util');

const question = util.promisify(rl.question).bind(rl);

module.exports = { rl, question };
