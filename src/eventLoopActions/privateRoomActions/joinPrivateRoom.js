const { question } = require('../../utils/readLine.js');
const axios = require('axios');
const chalk = require('chalk');

const joinPrivateRoom = async (roomname) => {
  let room = null;
  do {
    console.log(chalk.cyan('Please the password for this room'));
    let password = await question('');
    try {
      let res = await axios.post(
        `${process.env.SOCKET_SERVER}joinroom`,
        //`${process.env.SOCKET_SERVER_LOCAL}joinroom`,
        { isRoom: true },
        {
          auth: {
            username: roomname,
            password,
          },
        }
      );
      if (res.data.room) {
        console.log(chalk.bgGreen.black('Access granted!\n'));
        room = res.data.room.roomname;
      }
    } catch (err) {
      console.log(chalk.bgRed('Invalid password, try again.'));
    }
  } while (!room);

  return room;
};

module.exports = joinPrivateRoom;
