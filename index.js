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
    let quit = false;
    switch (input.trim()) {
      case '/quit':
        console.log('Goodbye!');
        quit = true;
        break;
      default:
        console.log('You entered ' + input);
        let payload = {
          user: socket.id,
          message: input,
        };
        socket.emit('message', payload);
        break;
    }
    if (!quit) rl.prompt();
  }).on('close', () => {
    console.log('Goodbye!');
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

socket.emit('join', 'General Room 1');
// TODO: Socket.io
// setup message listener
// rooms -> create, join, leave room

// TODO: If reason is "transport close" -> send message with "sorry, our server closed"
