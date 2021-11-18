const rl = require('../utils/readLine.js');
const axios = require('axios');
const chalk = require('chalk');

const createPrivateRoom = async () => {
  while (true) {
    console.log(chalk.cyan('\nPlease enter a name for your room:'));
    let roomname = await rl.question('');
    console.log(chalk.cyan('Please enter a password for your room'));
    let password = await rl.question('');

    let body = { roomname, password };

    try {
      //let res = await axios.post(`${process.env.SOCKET_SERVER}signup`, body);
      let res = await axios.post(
        //`${process.env.SOCKET_SERVER_LOCAL}rooms`,
        `${process.env.SOCKET_SERVER}rooms`,
        body
      );
    } catch (err) {
      //console.log(chalk.bgRed(err.response.data));
      console.log(
        chalk.bgRed(
          " Unable to create a room with that name, it's likely already taken."
        )
      );
      return false;
    }
    chalk.black.bgGreen(
      '\n Successfully created a room. Please select it from the list of private rooms. \n'
    );
    return roomname;
  }
};

module.exports = createPrivateRoom;
