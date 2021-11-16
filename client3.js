const io = require('socket.io-client');
//const socket = io('http://localhost:3000');
const socket = io('https://chat-li-dev.herokuapp.com/');

socket.on('connect', () => {
  console.log('You are CONNECTED!');
});

socket.emit('message', 'hello Kason'); // does not need to live in socket.on/'connect'

socket.on('message', (payload) => {
  console.log(payload);
});
