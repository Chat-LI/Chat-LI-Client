const rl = require('../../utils/readLine.js');
const axios = require('axios');
const chalk = require('chalk');

const login = async (socket) => {
  let user = null;
  do {
    console.log(chalk.cyan('\nPlease enter your username:'));
    let username = await rl.question('');
    console.log(chalk.cyan('Please enter your password'));
    let password = await rl.question('');

    try {
      let res = await axios.post(
        `${process.env.SOCKET_SERVER}signin`,
        //`${process.env.SOCKET_SERVER_LOCAL}signin`,
        {},
        {
          auth: {
            username,
            password,
          },
        }
      );

      if (res.data.user.token) {
        socket.user = res.data.user.username;
        socket.role = res.data.user.role;
        socket.token = res.data.user.token;

        console.log(chalk.bgGreen.black('You logged in!\n'));
        user = res.data.user.username;
      } else {
        console.log(chalk.bgRed('Invalid login. Please try again.'));
      }
    } catch (err) {
      console.log(chalk.bgRed(err.response.data));
    }
  } while (!user);

  return user;
};

module.exports = login;
