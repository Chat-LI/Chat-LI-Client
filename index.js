require('dotenv').config();

const io = require('socket.io-client');
const socket = io(process.env.SOCKET_SERVER);

require('./src/socket')(socket);
