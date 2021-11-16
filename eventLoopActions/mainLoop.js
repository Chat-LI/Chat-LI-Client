const loginOrRegister = require('./loginOrRegister');
const messageLoop = require('./messageLoop');
const roomChoice = require('./roomChoice.js');

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

  //if choice is 1

  messageLoop(socket, room);
};

module.exports = mainLoop;
