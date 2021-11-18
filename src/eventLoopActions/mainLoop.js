const loginOrRegister = require('./loginOrRegister');
const messageLoop = require('./messageLoop');
const roomChoice = require('./roomChoice');
const getRoomAction = require('./getRoomAction');
const privateRoomChoice = require('./privateRoomChoice');
const createPrivateRoom = require('./createPrivateRoom');
const login = require('./login');
const register = require('./register');
const chalk = require('chalk');

const mainLoop = async (socket) => {
  let choice = await loginOrRegister();
  while (choice !== '1' && choice !== '2') {
    console.log(chalk.bgRed(' Invalid selection\n '));
    choice = await loginOrRegister();
  }

  let username;
  if (choice === '1') {
    username = await login(socket);
  } else {
    username = await register(socket);
  }

  socket.emit('username', username);

  let roomAction = await getRoomAction();
  while (roomAction < 0 && roomAction > 3) {
    console.log(chalk.bgRed(' Invalid selection\n '));
    roomAction = await getRoomAction();
  }
  let room = 'General';
  if (roomAction === '1') {
    room = await roomChoice();
  } else if (roomAction === '2') {
    room = await privateRoomChoice();

    if (!room) {
      console.log(
        chalk.red.bgYellow(
          ' There are currently no private rooms available. Joining general... \n'
        )
      );
      room = 'General';
    }
  } else {
    room = await createPrivateRoom();
    if (!room) {
      room = 'General';
    }
  }

  console.log(
    `\n ${chalk.red('====')} Run ${chalk.green(
      '/help'
    )} to see list of available commands ${chalk.red('====')}\n`
  );
  console.log(chalk.magenta(`\nJoining room: ${room}`));
  socket.emit('join', { room, username });

  messageLoop(socket, room);
};

module.exports = mainLoop;
