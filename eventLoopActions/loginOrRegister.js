const rl = require('../utils/readLine');

const loginOrRegister = async () => {
  console.log('----- Choose an Option -----');

  let choice = await rl.question('1) Login --- 2) Register\n');

  return choice;
};

module.exports = loginOrRegister;
