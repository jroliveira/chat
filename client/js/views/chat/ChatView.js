define([
    'jquery',
    'underscore',
    'backbone',
    'socketio',
    
    'views/chat/FriendMessageView',
    'views/chat/MyMessageView',
    
    'text!templates/chat/chat.html',
    'jquery.format'
], function (
    $,
    _,
    Backbone,
    io,
     
    FriendMessageView,
    MyMessageView,
     
    template
) {

    var ChatView = Backbone.View.extend({

        el: $('.chat'),        

        events: {
            'click #send': 'send',
            'keypress #message': 'enter',
            'click .panel-primary > .panel-heading': 'toggle'
        },
        
        render: function () {
            this.$el.html(template);
            $('.chat > .panel > .panel-body, .chat > .panel > .panel-footer').toggle();
            
            var self = this;
            
            this.socket = io.connect();
 
            this.socket.on('connect', function () {

                var room = { current: '1', user: $('#user').val() };
                self.socket.emit('room', room);

                self.socket.on('connected', function() {
                    $('.chat > .panel > .panel-body, .chat > .panel > .panel-footer').toggle();
                    $('.chat > .panel').removeClass('panel-danger');
                    $('.chat > .panel').addClass('panel-primary');
                    $('.chat > .panel > .panel-heading > small').html('conectado');
                });

                self.socket.on('new user', function (message) {
                    var messageView = new FriendMessageView({ model: message });
                    self.showMessage(messageView);
                });

                self.socket.on('user left', function (message) {
                    var messageView = new FriendMessageView({ model: message });
                    self.showMessage(messageView);
                });

                self.socket.on('new message', function (message) {
                    var messageView = new FriendMessageView({ model: message });
                    self.showMessage(messageView);
                });

                self.socket.on('sent', function (message) {
                    var date = $.format.date(new Date(message.date), "dd/MM HH:mm");
                    $('#' + message.id + ' > .date').html(date);

                    $('#' + message.id + ' > .icon').removeClass('glyphicon-time');
                    $('#' + message.id + ' > .icon').addClass('glyphicon-ok');
                });

            });
            
            return this;
        },

        showMessage: function(messageView) {
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
            
            var message = { id: messageId, msg: $message.val(), date: null, user: $('#user').val() };
            var messageView = new MyMessageView({ model: message });
            this.showMessage(messageView);

            var newMessage = { id: messageId, msg: $message.val() };
            this.socket.emit('new message', newMessage);
            $message.val('');
        },
        
        toggle: function (e) {
            $('.chat > .panel > .panel-body, .chat > .panel > .panel-footer').toggle();
        }

    });

    return ChatView;

});