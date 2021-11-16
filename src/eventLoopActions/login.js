const rl = require('../utils/readLine.js');
const base64 = require('base-64');
const axios = require('axios');

const login = async (socket) => {
  // breakout of loop with successful response

  while (true) {
    let username = await rl.question('Please enter your username:\n');
    let password = await rl.question('Please enter a password\n');

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

        // TODO: store user object (username & token)
        console.log('Great success! You logged in!');
        break;
      } else {
        console.log('Sorry partner, invalid login');
      }
    } catch (e) {
      // console.log(e.response.status);
      if (e.response && e.response.status === 403) {
        console.log('Sorry partner, invalid login');
      } else {
        console.log(e);
      }
    }
  }
};

module.exports = login;
