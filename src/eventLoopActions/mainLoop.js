const loginOrRegister = require('./loginOrRegister');
const messageLoop = require('./messageLoop');
const roomChoice = require('./roomChoice');
const login = require('./login');
const register = require('./register');

const mainLoop = async (socket) => {
  let choice = await loginOrRegister();
  while (choice !== '1' && choice !== '2') {
    console.log('Invalid selection\n');
    choice = await loginOrRegister();
  }

  if (choice === '1') {
    await login(socket);
  } else {
    await register(socket);
  }

  let room = await roomChoice();
  console.log(`Joining room: ${room}`);
  socket.emit('join', room);

  messageLoop(socket, room);
};

module.exports = mainLoop;
