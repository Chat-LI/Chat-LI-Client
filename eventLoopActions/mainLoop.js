const loginOrRegister = require('./loginOrRegister');
const messageLoop = require('./messageLoop');

const mainLoop = async (socket) => {
  let choice;
  while (true) {
    choice = await loginOrRegister();

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
