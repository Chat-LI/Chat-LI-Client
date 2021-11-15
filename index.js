require('dotenv').config();

const io = require('socket.io-client');
//const socket = io(process.env.SOCKET_SERVER_LOCAL);
const socket = io(process.env.SOCKET_SERVER);

socket.on('connect', () => {
  console.log('You are CONNECTED!');
});

socket.emit('message', 'hello world');

socket.on('Something', () => {
  console.log('something event received from server');
});

socket.on('message', (payload) => {
  console.log('RECEIVED: ', payload);
});

socket.on('disconnect', (reason) => {
  console.log('Reason for disconnection: ', reason);
});

socket.emit('join', 'General Room 1');

// TODO: Socket.io
// setup message listener
// rooms -> create, join, leave room

// TODO: If reason is "transport close" -> send message with "sorry, our server closed"
