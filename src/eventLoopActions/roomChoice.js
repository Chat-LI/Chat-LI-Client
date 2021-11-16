const rl = require('../utils/readLine');
const rooms = require('../socket/rooms.json');

module.exports = async function () {
  console.log('Pick a room to join');

  let answer;
  answer = await rl.question(`
    1) General
    2) Gaming
    3) Music
    4) Programming
  \n`);

  while (!rooms.hasOwnProperty(answer)) {
    console.log('\n Invalid room choice');
    answer = await rl.question(`
    1) General
    2) Gaming
    3) Music
    4) Programming
  `);
  }

  return rooms[answer];
};
