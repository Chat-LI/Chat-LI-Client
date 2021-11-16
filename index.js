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
    let quit = false;
    switch (input.trim()) {
      case '/quit':
        console.log('Goodbye!');
        quit = true;
        process.exit(0);
      // break;
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

socket.emit('join', 'General Room 1');
// TODO: Socket.io
// setup message listener
// rooms -> create, join, leave room

// TODO: If reason is "transport close" -> send message with "sorry, our server closed"
