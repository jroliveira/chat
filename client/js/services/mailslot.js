chatApp.services.mailslot = function () {

	var server,
    connected = false;

	function verify() {
		if (!connected) return;

		localforage.length(function (length) {
			for (var i = 0; i < length; ++i) {
				localforage.key(i, function (key) {
					if (key != 'indexes') {
						localforage.getItem(key, function (message) {
							if (message.sent === 1) return;

							var newMessage = { id: message.id, msg: message.msg, key: key };

							server.emit('new message', newMessage);

							message.sent = 1;
							localforage.removeItem(key, function () {
								localforage.setItem(key, message);
							});
						});
					}
				});
			}
		});

		setTimeout(verify, 5000);
	}

	return {

		initialize: function (socket) {
			$(document).on('socketConnected', $.proxy(this.connected, this));

			server = socket;

			verify();
		},

		connected: function (event, isConnected) {
			connected = isConnected;

			verify();
		}

	};

}();
