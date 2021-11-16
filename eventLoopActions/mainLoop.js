const loginOrRegister = require('./loginOrRegister');
const messageLoop = require('./messageLoop');
const roomChoice = require('./roomChoice.js');
const login = require('./login.js');

const mainLoop = async (socket) => {
  let choice = await loginOrRegister();
  while (choice !== '1' && choice !== '2') {
    console.log('Invalid selection\n');
    choice = await loginOrRegister();
  }

  if (choice === '1') {
    await login(socket);
    // console.log(socket);
  } else {
    // register();
  }

  let room = await roomChoice();
  console.log(`Joining room: ${room}`);
  socket.emit('join', room);

  messageLoop(socket, room);
};

module.exports = mainLoop;
