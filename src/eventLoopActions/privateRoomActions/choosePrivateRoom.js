const fetchPrivateRooms = require('./fetchPrivateRooms');
const rl = require('../../utils/readLine');
const chalk = require('chalk');
const joinPrivateRoom = require('./joinPrivateRoom');
const util = require('util');

const question = util.promisify(rl.question).bind(rl);

const choosePrivateRoom = async () => {
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
      chalk.red('---'),
      chalk.cyan(`${room.roomname}`),
      chalk.red('---\n')
    );
  }

  let answer = parseInt(await question(''));

  while (answer < 1 || answer > rooms.length || Number.isNaN(answer)) {
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
    answer = parseInt(await question(''));
  }
  let roomResult = await joinPrivateRoom(rooms[answer - 1].roomname);
  return roomResult;
};

module.exports = choosePrivateRoom;
