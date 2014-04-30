var Message = require('./models/Message');

module.exports = function (io) {

    io.set('log level', 1);

    io.sockets.on('connection', function (socket) {

        socket.on('room', function (room) {
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

};