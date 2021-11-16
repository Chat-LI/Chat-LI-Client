const loginOrRegister = require('./loginOrRegister');
const messageLoop = require('./messageLoop');
const roomChoice = require('./roomChoice.js');

const mainLoop = async (socket) => {
  let choice;
  while (true) {
    choice = await loginOrRegister();

    let room = await roomChoice();
    console.log(`Joining room: ${room}`);

    socket.emit('join', room);

    if (choice != 1 && choice != 2) {
      console.log('Invalid selection\n');
    } else {
      break;
    }
  }

  //if choice is 1

  messageLoop(socket);
};

module.exports = mainLoop;
