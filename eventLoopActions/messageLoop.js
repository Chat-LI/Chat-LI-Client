const rl = require('../utils/readLine');

const messageLoop = (socket, room) => {
  rl.setPrompt('>> ');
  rl.prompt();

  rl.on('line', (input) => {
    if (input.startsWith('/quit')) {
      console.log('Goodbye!');
      socket.emit('quit', {});
      process.exit();
    } else {
      console.log('You entered ' + input);
      let payload = {
        user: socket.id,
        message: input,
        room,
      };
      socket.emit('message', payload);
    }

    rl.prompt();
  }).on('close', () => {
    console.log('Goodbye!');
    socket.emit('quit', {});
    process.exit();
  });
};

module.exports = messageLoop;
