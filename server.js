'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
// const express = require('express');
// const Socketserver = require('ws').Server;

// const PORT = 4000;

// const app = express()
//   .use(express.static('public'))
//   .listen(
//     PORT, '0.0.0.0', 'localhost',
//     () => console.log(`Listening on ${PORT}`)
// );

// const wss = new Socketserver({ server: app });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', function incoming(message){
//     console.log('received: %s', message)
//   });

//   ws.send('something')

//   ws.on('close', () => console.log('Client disconnected'));
// })

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });
