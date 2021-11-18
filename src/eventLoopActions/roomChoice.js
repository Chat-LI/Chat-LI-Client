const rl = require('../utils/readLine');
const rooms = require('../data/publicRooms.json');
const chalk = require('chalk');

module.exports = async function () {
  console.log(
    chalk.red('====='),
    chalk.cyan('Pick a room to join'),
    chalk.red('=====\n')
  );

  let idx = 1;
  for (let room of Object.keys(rooms)) {
    console.log(
      chalk.yellow(`${idx++}]`),
      chalk.red('---'),
      chalk.cyan(`${rooms[room]}`),
      chalk.red('---\n')
    );
  }

  let answer = await rl.question('');

  while (!Object.prototype.hasOwnProperty.call(answer)) {
    console.log(chalk.bgRed('\n Invalid room choice \n'));

    answer = await rl.question(``);
  }

  return rooms[answer];
};
