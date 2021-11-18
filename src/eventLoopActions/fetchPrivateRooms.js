const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const fetchPrivateRooms = async () => {
  try {
    var temp = {
      rooms: [],
    };
    //let res = await axios.get(`${process.env.SOCKET_SERVER}rooms`);
    let res = await axios.get(`${process.env.SOCKET_SERVER_LOCAL}rooms`);

    res.data.forEach((entry) => {
      temp.rooms.push({ roomname: entry.roomname });
    });

    let dataPath = path.join(__dirname, '..', 'data', 'privateRooms.json');

    await fs.writeFile(dataPath, JSON.stringify(temp), 'utf8', async (err) => {
      if (err) console.log(err);
    });
  } catch (err) {
    console.log(
      chalk.bgRed(' Something went wrong when fetching the private rooms! ')
    );
    console.log(err);
    return false;
  }
  let dataPath = path.join(__dirname, '..', 'data', 'privateRooms.json');

  let roomData = await fs.readFile(dataPath, 'utf8');
  roomData = JSON.parse(roomData).rooms;

  return roomData;
};

module.exports = fetchPrivateRooms;
