//const readline = require('readline');
const readlinePromises = require('readline/promises');
const rl = readlinePromises.createInterface(process.stdin, process.stdout);

module.exports = rl;
