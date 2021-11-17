const rl = require('../utils/readLine.js');
const axios = require('axios');

const login = async (socket) => {
  while (true) {
    let username = await rl.question('Please enter your username:\n');
    let password = await rl.question('Please enter your password\n');

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

        console.log('Great success! You logged in!');
        return res.data.user.username;
      } else {
        console.log('Invalid login. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        console.log('Invalid login. Please try again.');
      } else {
        console.log(err);
      }
    }
  }
};

module.exports = login;
