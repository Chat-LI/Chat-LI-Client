const rl = require('../utils/readLine');
const rooms = require('../socket/rooms.json');
const chalk = require('chalk');

const messageLoop = (socket, room) => {
  rl.setPrompt('>> ');
  rl.prompt();

  rl.on('line', (input) => {
    if (input === '/quit') {
      console.log(chalk.magenta('Goodbye!'));
      socket.emit('quit', {});
      process.exit();
    } else if (input === '/listUsers') {
      socket.emit('listUsers');
    } else if (input.startsWith('/listRoomUsers')) {
      let room = input.split(' ').pop().toLowerCase();

      if (
        !Object.values(rooms)
          .map((value) => value.toLowerCase())
          .includes(room)
      ) {
        console.log('[ERR] Invalid room name');
      } else {
        socket.emit('listRoomUsers', room);
      }
    } else {
      let payload = {
        user: socket.id,
        message: input,
        room,
      };
      socket.emit('message', payload);
    }

    rl.prompt();
  }).on('close', () => {
    console.log(chalk.magenta('Goodbye!'));
    socket.emit('quit', {});
    process.exit();
  });
};

module.exports = messageLoop;
