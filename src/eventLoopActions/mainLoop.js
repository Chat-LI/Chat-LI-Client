const loginOrRegister = require('./loginOrRegister');
const messageLoop = require('./messageLoop');
const roomChoice = require('./roomChoice');
const getRoomAction = require('./getRoomAction');
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

  let roomAction = await getRoomAction();
  while (roomAction < 0 && roomAction > 3) {
    console.log('Invalid selection\n');
    roomAction = await getRoomAction();
  }
  let room = 'General';
  if (roomAction === '1') {
    room = await roomChoice();
  } else if (roomAction === '2') {
    //user selected join private room
    console.log('Coming soon!');
  } else {
    //user selected create private room
    console.log('Coming soon!');
  }

  console.log(`Joining room: ${room}`);
  socket.emit('join', { room, username });

  messageLoop(socket, room);
};

module.exports = mainLoop;
