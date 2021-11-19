const { question } = require('../../utils/readLine.js');
const axios = require('axios');
const chalk = require('chalk');

const register = async (socket) => {
  let user = null;
  do {
    console.log(chalk.cyan('\nPlease enter a username:'));
    let username = await question('');
    console.log(chalk.cyan('Please enter a password'));
    let password = await question('');

    let body = { username, password };

    try {
      let res = await axios.post(`${process.env.SOCKET_SERVER}signup`, body);

      if (res.data.user.token) {
        socket.user = res.data.user.username;
        socket.role = res.data.user.role;
        socket.token = res.data.user.token;

        chalk.black.bgGreen('\n Successfully registered for Chat-LI. \n');
        user = res.data.user.username;
      } else {
        console.log(
          chalk.bgRed(
            ' Unable to register an account with those credentials, please try again. '
          )
        );
      }
    } catch (err) {
      console.log(chalk.bgRed(err.response.data));
    }
  } while (!user);
  return user;
};

module.exports = register;
