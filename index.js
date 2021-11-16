require('dotenv').config();

const io = require('socket.io-client');
//const socket = io(process.env.SOCKET_SERVER_LOCAL);
const socket = io(process.env.SOCKET_SERVER);

//const readline = require('readline');
const readlinePromises = require('readline/promises');
const rl = readlinePromises.createInterface(process.stdin, process.stdout);

const mainLoop = async () => {
  let choice;
  while (true) {
    choice = await loginOrRegister();

    if (choice != 1 && choice != 2) {
      console.log('Invalid selection\n');
    } else {
      break;
    }
  }

  //do stuff with choice
  messageLoop();
};

const loginOrRegister = async () => {
  console.log('----- Choose an Option -----');

  let choice = await rl.question('1) Login --- 2) Register\n');

  return choice;
};

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

socket.on('connect', async () => {
  console.log('You are CONNECTED!');
  mainLoop();
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
