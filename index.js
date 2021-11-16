require('dotenv').config();

const io = require('socket.io-client');
//const socket = io(process.env.SOCKET_SERVER_LOCAL);
const socket = io(process.env.SOCKET_SERVER);

const mainLoop = require('./eventLoopActions/mainLoop');

socket.on('connect', async () => {
  console.log('You are CONNECTED!');
  mainLoop(socket);
});

socket.on('user-connected', (user) => {
  console.log(`${user} has entered the building.`);
});

socket.on('message', (payload) => {
  // console.log(socket);
  console.log(`${socket.user}: ${payload.message}`);
});

socket.on('disconnect', (reason) => {
  console.log('Reason for disconnection: ', reason);
});

socket.on('quit', (payload) => {
  console.log(`${payload} quit the chat`);
});

socket.emit('join', 'General Room 1');
