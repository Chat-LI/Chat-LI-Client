const rl = require('../../utils/readLine.js');
const axios = require('axios');
const chalk = require('chalk');

const createPrivateRoom = async () => {
  let roomname = null;

  do {
    console.log(chalk.cyan('\nPlease enter a name for your room:'));
    roomname = await rl.question('');
    console.log(chalk.cyan('Please enter a password for your room'));
    let password = await rl.question('');

    let body = { roomname, password };

    try {
      let res = await axios.post(
        //`${process.env.SOCKET_SERVER_LOCAL}rooms`,
        `${process.env.SOCKET_SERVER}rooms`,
        body
      );
    } catch (err) {
      console.log(
        chalk.bgRed(
          " Unable to create a room with that name, it's likely already taken."
        )
      );
      roomname = null;
    }
    chalk.black.bgGreen(
      '\n Successfully created a room. Please select it from the list of private rooms. \n'
    );
  } while (!roomname);

  return roomname;
};

module.exports = createPrivateRoom;
