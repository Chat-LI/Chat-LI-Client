require('dotenv').config();

const io = require('socket.io-client');
const socket = io(process.env.SOCKET_SERVER_LOCAL);
//const socket = io(process.env.SOCKET_SERVER);

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

const messageLoop = () => {
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

socket.on('connect', () => {
  console.log('You are CONNECTED!');

  messageLoop();
});

socket.on('user-connected', (user) => {
  console.log(`${user} has entered the building.`);
});

socket.on('message', (payload) => {
  console.log(`${payload.user}: ${payload.message}`);
});

socket.on('disconnect', (reason) => {
  console.log('Reason for disconnection: ', reason);
});

socket.on('quit', (payload) => {
  console.log(`${payload} quit the chat`);
});

socket.emit('join', 'General Room 1');
