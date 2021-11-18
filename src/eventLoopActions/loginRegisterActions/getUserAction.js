const { question } = require('../../utils/readLine.js');
const chalk = require('chalk');

const getUserAction = async () => {
  console.log(
    chalk.red('====='),
    chalk.cyan('Choose an Option'),
    chalk.red('=====\n')
  );

  console.log(
    chalk.yellow('1]'),
    chalk.red('---'),
    chalk.cyan('Login'),
    chalk.red('---\n')
  );
  console.log(
    chalk.yellow('2]'),
    chalk.red('---'),
    chalk.cyan('Register'),
    chalk.red('---\n')
  );
  let choice = await question('');

  return choice;
};

module.exports = getUserAction;
