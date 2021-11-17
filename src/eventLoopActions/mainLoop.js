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

  let username;
  if (choice === '1') {
    username = await login(socket);
  } else {
    username = await register(socket);
  }

  // let username = 'Bob';
  let room = await roomChoice();
  console.log(`Joining room: ${room}`);
  socket.emit('join', { room, username });

  messageLoop(socket, room);
};

module.exports = mainLoop;
