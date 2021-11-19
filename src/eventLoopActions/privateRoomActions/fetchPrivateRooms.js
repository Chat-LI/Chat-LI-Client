const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');

const fetchPrivateRooms = async () => {
  let dataPath = path.join(path.dirname(process.execPath), 'privateRooms.json');
  try {
    var temp = {
      rooms: [],
    };
    let res = await axios.get(`${process.env.SOCKET_SERVER}rooms`);

    res.data.forEach((entry) => {
      temp.rooms.push({ roomname: entry.roomname });
    });

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

  let roomData = await fs.readFile(dataPath, 'utf8');
  roomData = JSON.parse(roomData).rooms;

  return roomData;
};

module.exports = fetchPrivateRooms;
