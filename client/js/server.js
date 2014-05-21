chatApp.server = function (socket, view) {

	socket.on('disconnect', function () {
		view.showStatus(false, 'desconectado');

		$(document).trigger('socketConnected', [false]);
	});

	socket.on('connecting', function () {
		view.showStatus(false, 'aguarde, conectando...');
	});

	socket.on('connect_failed', function () {
		view.showStatus(false, 'falha ao conectar');
	});

	socket.on('reconnect', function () {
		view.showStatus(true, 'reconectado');
	});

	socket.on('reconnecting', function () {
		view.showStatus(false, 'aguarde, reconectando...');
	});

	socket.on('reconnect_failed', function () {
		view.showStatus(false, 'falha ao reconectar');
	});

	socket.on('connect', function () {
		var room = { current: 'global' };
		socket.emit('room', room);

		socket.on('connected', function (rooms) {
		    view.showStatus(true, 'conectado');
		    $(document).trigger('socketConnected', [true]);

		    view.fetchRooms(rooms);
		});

		socket.on('new user', function (message) {
			var messageView = new chatApp.views.chat.message.FriendMessageView({ model: message });
			view.showMessage(messageView);
		});

		socket.on('user left', function (message) {
			var messageView = new chatApp.views.chat.message.FriendMessageView({ model: message });
			view.showMessage(messageView);
		});

		socket.on('new message', function (message) {
			var messageView = new chatApp.views.chat.message.FriendMessageView({ model: message });
			view.showMessage(messageView);
		});

		socket.on('sent', function (message) {
			localforage.ready(function () {
				localforage.removeItem(message.key);

				view.markAsSent(message);
			});
		});

		socket.on('error', function (err) {
			if (err == 'handshake unauthorized') $(document).trigger('loginRoute');
		});

	});

};