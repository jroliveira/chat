chatApp.views.chat.ChatView = Backbone.View.extend({

	events: {
		'click #send': 'send',
		'keypress #message': 'enter'
	},

	initialize: function () {
		this.template = chatApp.infraestructure.templates.get('chat/chat');
	},

	render: function () {
		this.$el.html(this.template);

		return this;
	},

	showStatus: function (connected, message) {
		if (connected) {
			$('.chat-status').removeClass('chat-disconnected');
			$('.chat-status').addClass('chat-connected');
		} else {
			$('.chat-status').removeClass('chat-connected');
			$('.chat-status').addClass('chat-disconnected');
		}

		$('.navemenu-offcanvas > .panel > .panel-heading small').html(message);
	},

	showMessage: function (messageView) {
		var content = messageView.render();
		$('#messages').append(content.el);

		$('.chat-content').animate({ scrollTop: $('#messages').height() }, 1000);
	},

	markAsSent: function (message) {
		var date = $.format.date(new Date(message.date), "dd/MM HH:mm");
		$('#' + message.id + ' > .date').html(date);
		$('#' + message.id + ' > .icon').removeClass('glyphicon-time');
		$('#' + message.id + ' > .icon').addClass('glyphicon-ok');
	},

	fetchRooms: function (rooms) {
		var $ul = $('#rooms');
		$ul.empty();

		rooms.forEach(function (room) {
			$ul.append(
                '<li id="' + room.name + '" class="active">' +
                    '<a href="#">' +
                        '<span class="badge pull-right">' + room.clients.length + '</span>' +
                        room.name.toUpperCase() +
                    '</a>' +
                '</li>'
            );

			room.clients.forEach(function (client) {
				$ul.append('<li><a href="#">' + client + '</a></li>');
			});
		});
	},

	newUser: function (message) {
		var messageView = new chatApp.views.chat.message.NewUserMessageView({ model: message });
		this.showMessage(messageView);

		$('#' + message.room).after('<li><a href="#">' + message.user + '</a></li>');
	},

	userLeft: function (message) {
		var messageView = new chatApp.views.chat.message.UserLeftMessageView({ model: message });
		this.showMessage(messageView);
	},

	partGuid: function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	},

	enter: function (e) {
		if (e.keyCode === 13) this.send(e);
	},

	send: function (e) {
		e.preventDefault();

		var $message = $('#message');
		if (!$message.val()) return;

		var messageId = this.partGuid();

		var message = { id: messageId, msg: $message.val(), date: null, user: 'eu' };
		var messageView = new chatApp.views.chat.message.MyMessageView({ model: message });
		this.showMessage(messageView);

		$message.val('');
	}

});