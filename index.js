require('dotenv').config();

const io = require('socket.io-client');
//const socket = io(process.env.SOCKET_SERVER_LOCAL);
const socket = io(process.env.SOCKET_SERVER);

require('./socket')(socket);
