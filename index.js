const path = require('path');
const dotenvAbsolutePath = path.join(__dirname, './.env');

require('dotenv').config({ path: dotenvAbsolutePath });

const io = require('socket.io-client');
const socket = io(process.env.SOCKET_SERVER);

require('./src/socket')(socket);
