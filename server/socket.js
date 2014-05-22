var Message = require('./models/Message');

module.exports = function (io) {

	function getRooms() {
		return Object.keys(io.sockets.manager.rooms);
	}

	function getClientsInRoom(room) {
		return io.sockets.clients(room);
	}

	function connected(client) {
		var result = [];

		var rooms = getRooms();
		for (var i = 0; i < rooms.length; i++) {
			var room = rooms[i].replace('/', ''),
                name = room;

			if (name == '') name = 'default';
			var newRoom = { name: name, clients: [] };

			var users = getClientsInRoom(room);
			users.forEach(function (user) {
				newRoom.clients.push(user.user);
			});

			result.push(newRoom);

			if (i + 1 == rooms.length)
				client.in(client.room.current).emit('connected', result);
		}
	}

	io.sockets.on('connection', function (client) {
		var session = client.handshake.session;

		client.on('room', function (room) {
			if (client.room) client.leave(client.room.current);

			client.room = room;
			client.user = session.user.email;
			client.join(client.room.current);

			connected(client);
			client.in(client.room.current).broadcast.emit('new user', { msg: 'entrou', date: new Date(), user: client.user, room: client.room.current });
		});

		client.on('new message', function (message) {
			var newMessage = new Message({
				id: message.id,
				message: message.msg,
				date: new Date().toString(),
				account: session.user._id
			});

			newMessage.save();

			client.in(client.room.current).emit('sent', { id: message.id, date: new Date(), key: message.key });
			client.in(client.room.current).broadcast.emit('new message', { msg: message.msg, date: new Date(), user: client.user });
		});

		client.on('disconnect', function () {
			client.broadcast.emit('user left', { msg: 'saiu', date: new Date(), user: client.user });
		});

	});

};