const executeMainLoop = require('../eventLoopActions/mainLoop.js');
const getIntroScreen = require('../utils/getIntroScreen');
const chalk = require('chalk');

module.exports = function (socket) {
  socket.on('connect', async () => {
    getIntroScreen();
    executeMainLoop(socket);
  });

  socket.on('user-connected', (user) => {
    console.log(chalk.green(`${user} has entered the chat.`));
  });

  socket.on('message', (payload) => {
    console.log(`${payload.username}: ${payload.message}`);
  });

  socket.on('disconnect', (reason) => {
    console.log(chalk.bgRed('Reason for disconnection: '), reason);
  });

  socket.on('quit', (username) => {
    console.log(chalk.red(`${username} quit the chat`));
  });

  socket.on('listUsers', (payload) => {
    console.log('[INFO]: List of all users:');
    console.log(payload);
  });

  socket.on('listRoomUsers', ({ members, room }) => {
    console.log(`[INFO]: List of users in room: ${room}`);
    for (let member of members) {
      console.log(member);
    }
  });
};
