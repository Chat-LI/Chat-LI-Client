const messageLoop = require('./messageLoop');
const roomChoice = require('./roomChoice');
const getRoomAction = require('./getRoomAction');
const chalk = require('chalk');
const privateRoomInterface = require('./privateRoomActions/privateRoomInterface');
const loginRegisterInterface = require('./loginRegisterActions/loginRegisterInterface');

const mainLoop = async (socket) => {
  //prompt user for login or register
  let choice = await loginRegisterInterface.getUserAction();
  while (choice !== '1' && choice !== '2') {
    console.log(chalk.bgRed(' Invalid selection\n '));
    choice = await loginRegisterInterface.getUserAction();
  }

  choice === '1'
    ? (username = await loginRegisterInterface.login(socket))
    : (username = await loginRegisterInterface.register(socket));

  socket.emit('username', username);

  //prompt user to choose whether they want to join a private or public room, or create a private room
  let roomAction = await getRoomAction();
  while (roomAction < 0 && roomAction > 3) {
    console.log(chalk.bgRed(' Invalid selection\n '));
    roomAction = await getRoomAction();
  }

  let room = 'General';
  //user chose join public room
  if (roomAction === '1') {
    room = await roomChoice();

    //user chose join private room
  } else if (roomAction === '2') {
    room = await privateRoomInterface.choosePrivateRoom();

    if (!room) {
      console.log(
        chalk.red.bgYellow(
          ' There are currently no private rooms available. Joining general... \n'
        )
      );
      room = 'General';
    }
    //user chose create a private room
  } else {
    room = await privateRoomInterface.createPrivateRoom();
    if (!room) {
      room = 'General';
    }
  }

  //display help commands prompt
  console.log(
    `\n ${chalk.red('====')} Run ${chalk.green(
      '/help'
    )} to see list of available commands ${chalk.red('====')}\n`
  );

  //inform server of the room that a user has joined
  console.log(chalk.magenta(`\nJoining room: ${room}`));
  socket.emit('join', { room, username });

  //begin messaging logic
  messageLoop(socket, room);
};

module.exports = mainLoop;
