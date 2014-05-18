ChatView = Backbone.View.extend({

    events: {
        'click #send': 'send',
        'keypress #message': 'enter',
        'click .panel-primary > .panel-heading': 'toggle'
    },

    initialize: function () {
    	this.template = templates.get('chat/chat');
    },

    render: function () {
    	var self = this;
	    
        this.$el.html(this.template);


        var relativePath = $('#relativePath').val(),
	        socket = io.connect(relativePath);

        mailslot.initialize(socket);

        socket.on('disconnect', function () {
            self.showStatus(false, 'desconectado');

            $(document).trigger('connected', [false]);
        });

        socket.on('connecting', function () {
            self.showStatus(false, 'aguarde, conectando...');
        });

        socket.on('connect_failed', function() {
            self.showStatus(false, 'falha ao conectar');
        });

        socket.on('reconnect', function() {
            self.showStatus(true, 'reconectado');
        });

        socket.on('reconnecting', function() {
            self.showStatus(false, 'aguarde, reconectando...');
        });

        socket.on('reconnect_failed', function () {
            self.showStatus(false, 'falha ao reconectar');
        });

        socket.on('connect', function () {
            var room = { current: '1' };
            socket.emit('room', room);

            socket.on('connected', function () {
                self.showStatus(true, 'conectado');
                $(document).trigger('connected', [true]);
            });

            socket.on('new user', function (message) {
                var messageView = new FriendMessageView({ model: message });
                self.showMessage(messageView);
            });

            socket.on('user left', function (message) {
                var messageView = new FriendMessageView({ model: message });
                self.showMessage(messageView);
            });

            socket.on('new message', function (message) {
                var messageView = new FriendMessageView({ model: message });
                self.showMessage(messageView);
            });

            socket.on('sent', function (message) {
                localforage.ready(function () {
                    localforage.removeItem(message.key);
                        
                    var date = $.format.date(new Date(message.date), "dd/MM HH:mm");
                    $('#' + message.id + ' > .date').html(date);
                    $('#' + message.id + ' > .icon').removeClass('glyphicon-time');
                    $('#' + message.id + ' > .icon').addClass('glyphicon-ok');
                });
            });

            socket.on('error', function (err) {
                if (err == 'handshake unauthorized') return window.location = '/entrar';
            });

        });

        return this;
    },

    showStatus: function (connected, message) {
    	if (connected) {
    		$('.chat > div > .panel').removeClass('panel-default');
    		$('.chat > div > .panel').removeClass('panel-danger');
    		$('.chat > div > .panel').addClass('panel-primary');
        } else {
    		$('.chat > div > .panel').removeClass('panel-primary');
    		$('.chat > div > .panel').addClass('panel-danger');
        }
            
    	$('.chat > div > .panel > .panel-heading > small').html(message);
    },

    showMessage: function (messageView) {
        var content = messageView.render();
        $('#messages').append(content.el);

        $('.panel-body').animate({ scrollTop: $('#messages').height() }, 1000);
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
        var messageView = new MyMessageView({ model: message });
        this.showMessage(messageView);

        $message.val('');
    },

    toggle: function (e) {
    	$('.chat > div >  .panel > .panel-body, .chat > div > .panel > .panel-footer').toggle();
    }

});