const chalk = require('chalk');

const getIntroScreen = () => {
  console.log(
    chalk.cyan.bold('   _____ _           _          _      _____  ')
  );
  console.log(
    chalk.cyan.bold('  / ____| |         | |        | |    |_   _| ')
  );
  console.log(
    chalk.cyan.bold(' | |    | |__   __ _| |_ ______| |      | |   ')
  );
  console.log(
    chalk.cyan.bold(" | |    | '_ \\ / _` | __|______| |      | |   ")
  );
  console.log(
    chalk.cyan.bold(' | |____| | | | (_| | |_       | |____ _| |_  ')
  );
  console.log(
    chalk.cyan.bold('  \\_____|_| |_|\\__,_|\\__|      |______|_____| ')
  );
  console.log(
    chalk.cyan.bold('                                              \n\n')
  );
};

module.exports = getIntroScreen;
