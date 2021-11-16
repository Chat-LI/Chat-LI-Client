const loginOrRegister = require('./loginOrRegister');
const messageLoop = require('./messageLoop');
const login = require('./login.js');

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

  if (choice == 1) {
    await login(socket);
    // console.log(socket);
  } else {
    // register();
  }

  messageLoop(socket);
};

module.exports = mainLoop;
