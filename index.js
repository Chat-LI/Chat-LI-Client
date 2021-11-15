const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('You are CONNECTED!')
});

socket.emit('message', 'hello Kason'); // does not need to live in socket.on/'connect'

socket.on('Something', () => {
  console.log('Yay! We did it!');
});

socket.on('message', (payload) => {
  console.log(payload);
});

socket.on('disconnect', (reason) => {
  console.log('Reason for disconnection: ', reason);
});

socket.emit('join', 'General Room 1');

// TODO: Socket.io
// setup message listener
// rooms -> create, join, leave room

// TODO: If reason is "transport close" -> send message with "sorry, our server closed"
