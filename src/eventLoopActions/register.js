const rl = require('../utils/readLine.js');
const axios = require('axios');

const register = async (socket) => {
  while (true) {
    let username = await rl.question('Please enter a username:\n');
    let password = await rl.question('Please enter a password\n');

    let body = { username, password };

    try {
      let res = await axios.post(`${process.env.SOCKET_SERVER}signup`, body);

      if (res.data.user.token) {
        socket.user = res.data.user.username;
        socket.role = res.data.user.role;
        socket.token = res.data.user.token;

        console.log('\nSuccessfully registered for Chat-LI.\n');
        return res.data.user.username;
      } else {
        console.log(
          'Unable to register an account with those credentials, please try again.'
        );
      }
    } catch (err) {
      console.log(
        'Unable to register an account with those credentials, please try again.'
      );
    }
  }
};

module.exports = register;
