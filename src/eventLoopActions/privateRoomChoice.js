const fetchPrivateRooms = require('./fetchPrivateRooms');
const rl = require('../utils/readLine');
const chalk = require('chalk');

const privateRoomChoice = async () => {
  let roomData = await fetchPrivateRooms();

  if (!roomData) {
    console.log(
      chalk.bgRed(' Something went wrong when fetching the rooms! \n ')
    );
    return false;
  }

  if (roomData.length === 0) {
    chalk.bgRed(' No private rooms are available at the moment! \n ');
    return false;
  }

  console.log(
    chalk.red('====='),
    chalk.cyan('Pick a room to join'),
    chalk.red('=====\n')
  );

  let idx = 1;
  let rooms = [];
  for (let room of roomData) {
    rooms.push(room);
    console.log(
      chalk.yellow(`${idx++}]`),
      chalk.red('   ---'),
      chalk.cyan(`${room.roomname}`),
      chalk.red('---\n')
    );
  }

  let answer = await rl.question('');

  while (answer < 1 || answer > rooms.length) {
    idx = 1;
    console.log(chalk.bgRed('\n Invalid room choice \n'));
    for (let room of roomData) {
      console.log(
        chalk.yellow(`${idx++}]`),
        chalk.red('   ---'),
        chalk.cyan(`${room.roomname}`),
        chalk.red('---\n')
      );
    }
    answer = await rl.question(``);
  }

  return rooms[answer - 1].roomname;
};

module.exports = privateRoomChoice;
