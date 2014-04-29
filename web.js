var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    swig = require('swig'),
    path = require('path'),
    
    mongoose = require('mongoose'),
    Account = require('./server/models/Account'),
    Message = require('./server/models/Message');

var port = process.env.PORT || 4000;
server.listen(port, function () {
    console.log("Listening on " + port);
});

app.configure(function () {
    app.use(express.json());
    app.use(express.urlencoded());

    app.engine('html', swig.renderFile);
    app.set('views', path.join(__dirname, '/client/views'));
    app.set('view cache', false);
    swig.setDefaults({ cache: false });
    app.set('view engine', 'html');
    app.use('/client', express.static(path.join(__dirname, '/client')));

    app.use(express.cookieParser());
    app.use(express.session({ secret: 'secretsession' }));
});

var config = {
    user: 'sa',
    password: 'sa',
    server: 'oceanic.mongohq.com',
    port: '10067',
    database: 'chat'
};

var connectionString = 'mongodb://' + config.user +  ':' + config.password + '@' + config.server + ':' + config.port + '/' + config.database;
        
mongoose.connect(connectionString);
        
app.get('/', function (req, res) {
    var email = req.query.email;
    if (!email) return res.redirect('/login');

    var user = email.substring(0, email.indexOf('@') + 1);
    
    res.render('home/index.html', { user: user });
});

app.get('/login', function (req, res) {
    res.render('login/index.html');
});

io.sockets.on('connection', function (socket) {

    socket.on('room', function(room) {
        if (socket.room) socket.leave(socket.room);
            
        socket.room = room;
        socket.join(room.current);            
            
        socket.in(room.current).emit('connected');
        socket.in(room.current).broadcast.emit('new user', { msg: 'entrou', date: new Date(), user: room.user });
    });
        
    socket.on('new message', function (message) {
        var newMessage = new Message({
            id: message.id,
            email: socket.room.user,
            message: message.msg,
            date: new Date().toString()
        });
        
        newMessage.save();

        socket.in(socket.room.current).emit('sent', { id: message.id, date: new Date() });
        socket.in(socket.room.current).broadcast.emit('new message', { msg: message.msg, date: new Date(), user: socket.room.user });
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('user left', { msg: 'saiu', date: new Date(), user: socket.room.user });
    });
        
});