const rl = require('../utils/readLine.js');
const axios = require('axios');
const chalk = require('chalk');

const login = async (socket) => {
  while (true) {
    console.log(chalk.cyan('\nPlease enter your username:'));
    let username = await rl.question('');
    console.log(chalk.cyan('Please enter your password'));
    let password = await rl.question('');

    try {
      let res = await axios.post(
        `${process.env.SOCKET_SERVER}signin`,
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

        console.log(chalk.black.bgGreen('\n Successfully logged in \n'));
        break;
      } else {
        console.log(chalk.bgRed('Invalid login. Please try again.'));
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        console.log(chalk.bgRed('Invalid login. Please try again.'));
      } else {
        console.log(err);
      }
    }
  }
};

module.exports = login;
