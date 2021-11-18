const { rl } = require('../utils/readLine.js');
const rooms = require('../data/publicRooms.json');
const commandList = require('../socket/commands.json');
const chalk = require('chalk');

const messageLoop = (socket, room) => {
  rl.setPrompt('>> ');
  rl.prompt();

  let currentRoom = room;
  rl.on('line', (input) => {
    if (input === '/quit') {
      console.log(chalk.magenta('Goodbye!'));
      socket.emit('quit');
      process.exit();
    } else if (input === '/listUsers') {
      socket.emit('listUsers');
    } else if (input === '/listRooms') {
      console.log(Object.values(rooms));
    } else if (input.startsWith('/switchRoom')) {
      let room = input.split(' ').pop().toLowerCase();

      if (
        !Object.values(rooms)
          .map((value) => value.toLowerCase())
          .includes(room)
      ) {
        console.log('[ERR] Invalid room name');
      } else {
        socket.emit('leaveRoom', currentRoom);
        socket.emit('join', { room });
        currentRoom = room;
      }
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
    } else if (input === '/help') {
      console.log('[INFO] List of commands to run\n');
      commandList.forEach((command) => {
        console.log(command);
      });
      console.log('\n');
    } else {
      let payload = {
        message: input,
        room: currentRoom,
      };
      socket.emit('message', payload);
    }

    rl.prompt();
  }).on('close', () => {
    console.log(chalk.magenta('Goodbye!'));
    socket.emit('quit');
    process.exit();
  });
};

module.exports = messageLoop;
