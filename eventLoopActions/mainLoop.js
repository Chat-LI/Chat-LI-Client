const loginOrRegister = require('./loginOrRegister');
const messageLoop = require('./messageLoop');
const roomChoice = require('./roomChoice.js');
const login = require('./login.js');

const mainLoop = async (socket) => {
  let choice;
  let room;
  while (true) {
    choice = await loginOrRegister();

    room = await roomChoice();
    console.log(`Joining room: ${room}`);

    socket.emit('join', room);

    if (choice != 1 && choice != 2) {
      console.log('Invalid selection\n');
    } else {
      break;
    }
  }

  if (choice == 1) {
    await login(socket);
    // console.log(socket);
  } else {
    // register();
  }

  messageLoop(socket, room);
};

module.exports = mainLoop;
