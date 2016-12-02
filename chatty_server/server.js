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

// 4 random colours that will be assigned to a client when they connect
const colours = ["#0600ff", "#f1c40f", "#ff6347", "#34495e"];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, rjepresented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // this sends a user has connected message to every other client and updates how many clients are online
  const counterMessage = {
    type: 'incomingConnection',
    userCounter: `${wss.clients.length} users online`,
    content: 'A user has connected'
  };
  wss.clients.forEach(function each(client) {
    if (client !== ws) client.send(JSON.stringify(counterMessage));
  });

  // assigns a random colour to the user
  const color = colours[Math.floor((Math.random() * 4))];

  ws.on('message', function (message){
    const parsedMessage = JSON.parse(message);

    // this handles the incoming message and notification from the client side and sends it back to them
    switch(parsedMessage.type) {
      case 'postMessage':
        parsedMessage.id = uuid.v1();
        parsedMessage.color = color;
        parsedMessage.type = 'incomingMessage';
        break;
      case 'postNotification':
        parsedMessage.type = 'incomingNotification';
        break;
      default:
        throw new Error(`Unknown event type ${parsedMessage.type}`)
    }

  wss.broadcast(JSON.stringify(parsedMessage)); // broadcasts the message after being parsed and handled
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    // this displays the user counter and also displays how many users are online
    const counterMessage = {
      type: 'incomingConnection',
      userCounter: `${wss.clients.length} users online`,
      content: 'A user has disconnected'
    };
    wss.broadcast(JSON.stringify(counterMessage));
    console.log('Client disconnected');
  });
});

