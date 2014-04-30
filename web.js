var express = require('express'),
    app = express();
require('./server/configs/app')(app);

var server = require('http').createServer(app),
    io = require('socket.io').listen(server);
require('./server/socket')(io);

require('./server/configs/mongoose')();

require('./server/configs/passport')();

require('./server/router')(app);

var port = process.env.PORT || 8000;
server.listen(port, function () {
    console.log("Listening on " + port);
});