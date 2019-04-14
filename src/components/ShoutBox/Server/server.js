const WebSocket = require('ws');
const express = require('express');

const wss = new WebSocket.Server({ port: 3030 });
const app = express();

const PORT = process.env.PORT || 3031;

let currentSong = 'No song playing';

// Remember to set this
const toimitusNick = process.env.TOIMITUSNICK;

console.log('Listening for chatbox on port 3030');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Check for name and message
    const jData = JSON.parse(data);
    if (jData.name && jData.message && jData.name !== 'TWRToimitus') {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          console.log("Relaying message");
          data = data.replace(toimitusNick, "TWRToimitus");
          client.send(data);
        }
      });
    }
  });
});

app.post('newsong', (req, res) => {
  const song = req.body;

  if (!song || typeof song !== 'string') {
    return res.sendStatus(400)
  }

  currentSong = song;
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Listening for song metadata updates on port ${PORT}`)
});
