const { question } = require('../utils/readLine.js');
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

  let answer = await question('');

  // eslint-disable-next-line no-prototype-builtins
  while (!rooms.hasOwnProperty(answer)) {
    console.log(chalk.bgRed('\n Invalid room choice \n'));

    answer = await question(``);
  }

  return rooms[answer];
};
