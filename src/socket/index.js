const mainLoop = require('../eventLoopActions/mainLoop.js');

module.exports = function (socket) {
  socket.on('connect', async () => {
    console.log('You are CONNECTED!');
    mainLoop(socket);
  });

  socket.on('user-connected', (user) => {
    console.log(`${socket.user} has entered the chat.`);
  });

  socket.on('message', (payload) => {
    console.log(`${socket.user}: ${payload.message}`);
  });

  socket.on('disconnect', (reason) => {
    console.log('Reason for disconnection: ', reason);
  });

  socket.on('quit', (payload) => {
    console.log(`${payload} quit the chat`);
  });
};
