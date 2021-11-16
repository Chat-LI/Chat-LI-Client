const rl = require('../utils/readLine');

const getRoomType = async () => {
  console.log('----- Select an Option -----\n');

  let choice = await rl.question(
    '1) Join a public room --- 2) Join a private room --- 3) Create a private room\n'
  );

  return choice;
};

module.exports = getRoomType;
