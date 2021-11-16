const mainLoop = require('../eventLoopActions/mainLoop.js');

module.exports = function (socket) {
  socket.on('connect', async () => {
    console.log('You are CONNECTED!');
    mainLoop(socket);
  });

  socket.on('user-connected', (user) => {
    console.log(`${user} has entered the building.`);
  });

  socket.on('message', (payload) => {
    console.log(`${payload.user}: ${payload.message}`);
  });

  socket.on('disconnect', (reason) => {
    console.log('Reason for disconnection: ', reason);
  });

  socket.on('quit', (payload) => {
    console.log(`${payload} quit the chat`);
  });

  socket.emit('join', 'General Room 1');
};
