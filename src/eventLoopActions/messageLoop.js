const rl = require('../utils/readLine');
const rooms = require('../socket/rooms.json');

const messageLoop = (socket, room) => {
  rl.setPrompt('>> ');
  rl.prompt();

  rl.on('line', (input) => {
    if (input === '/quit') {
      console.log('Goodbye!');
      socket.emit('quit');
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
      console.log('You entered ' + input);
      let payload = {
        message: input,
        room,
      };
      socket.emit('message', payload);
    }

    rl.prompt();
  }).on('close', () => {
    console.log('Goodbye!');
    socket.emit('quit');
    process.exit();
  });
};

module.exports = messageLoop;
