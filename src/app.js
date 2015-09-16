'use strict';

const
  express = require('express'),
  app = express();

require('./configs/app')(app);

const
  server = require('http').createServer(app);

require('./router')(app);

let port = process.env.PORT || 4002;
server.listen(port, function () {
  console.log("Listening on " + port);
});