const rl = require('../utils/readLine');
const rooms = require('../socket/rooms.json');
const chalk = require('chalk');

module.exports = async function () {
  console.log(
    chalk.red('       ====='),
    chalk.cyan('Pick a room to join'),
    chalk.red('=====\n')
  );

  let answer;

  console.log(
    chalk.yellow('         1]'),
    chalk.red('   ---'),
    chalk.cyan('General'),
    chalk.red('---\n')
  );
  console.log(
    chalk.yellow('         2]'),
    chalk.red('   ---'),
    chalk.cyan('Gaming'),
    chalk.red('---\n')
  );
  console.log(
    chalk.yellow('         3]'),
    chalk.red('    ---'),
    chalk.cyan('Music'),
    chalk.red('---\n')
  );
  console.log(
    chalk.yellow('         4]'),
    chalk.red(' ---'),
    chalk.cyan('Programming'),
    chalk.red('---\n')
  );
  console.log(
    chalk.yellow('         5]'),
    chalk.red('   ---'),
    chalk.cyan('Sports'),
    chalk.red('---\n')
  );

  answer = await rl.question('');

  while (!rooms.hasOwnProperty(answer)) {
    console.log(chalk.bgRed('\n Invalid room choice \n'));
    console.log(
      chalk.yellow('         1]'),
      chalk.red('   ---'),
      chalk.cyan('General'),
      chalk.red('---\n')
    );
    console.log(
      chalk.yellow('         2]'),
      chalk.red('   ---'),
      chalk.cyan('Gaming'),
      chalk.red('---\n')
    );
    console.log(
      chalk.yellow('         3]'),
      chalk.red('    ---'),
      chalk.cyan('Music'),
      chalk.red('---\n')
    );
    console.log(
      chalk.yellow('         4]'),
      chalk.red(' ---'),
      chalk.cyan('Programming'),
      chalk.red('---\n')
    );
    console.log(
      chalk.yellow('         5]'),
      chalk.red('   ---'),
      chalk.cyan('Sports'),
      chalk.red('---\n')
    );
    answer = await rl.question(``);
  }

  return rooms[answer];
};
