// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid')

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const app = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server:app });

// Broadcast all messages to all clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, rjepresented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.clients.forEach(function each(client) {
      if (client !== ws) {
        let counterMessage = { type: 'incomingConnection',
                               userCounter: `${wss.clients.length} users online`,
                               content: 'A user has connected'};
        wss.broadcast(JSON.stringify(counterMessage));
      }
    });
  // let counterMessage = { type: 'incomingConnection',
  //                        userCounter: `${wss.clients.length} users online`,
  //                        content: 'A user has connected'};
  // wss.broadcast(JSON.stringify(counterMessage));

  ws.on('message', function (message){
    console.log(message)
    const parsedMessage = JSON.parse(message);

    switch(parsedMessage.type) {
      case 'postMessage':
        parsedMessage.id = uuid.v1();
        parsedMessage.type = 'incomingMessage';
        break;
      case 'postNotification':
        parsedMessage.type = 'incomingNotification';
        break;
      default:
        throw new Error(`Unknown event type ${parsedMessage.type}`)
    }

    wss.broadcast(JSON.stringify(parsedMessage));
  });

  // ws.send({type: 'test', counter: '15 users online'})
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    let counterMessage = { type: 'incomingConnection',
                           userCounter: `${wss.clients.length} users online`,
                           content: 'A user has disconnected'};
    wss.broadcast(JSON.stringify(counterMessage));
    console.log('Client disconnected');
  });
});

