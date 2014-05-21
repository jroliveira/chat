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
            $('.navemenu-offcanvas > .panel').removeClass('navemenu-offcanvas-default');
            $('.navemenu-offcanvas > .panel').removeClass('navemenu-offcanvas-danger');
            $('.navemenu-offcanvas > .panel').addClass('navemenu-offcanvas-primary');
        } else {
            $('.navemenu-offcanvas > .panel').removeClass('navemenu-offcanvas-primary');
            $('.navemenu-offcanvas > .panel').addClass('navemenu-offcanvas-danger');
        }

        $('.navemenu-offcanvas > .panel > .panel-heading small').html(message);
    },

    showMessage: function (messageView) {
        var content = messageView.render();
        $('#messages').append(content.el);

        $('.panel-body').animate({ scrollTop: $('#messages').height() }, 1000);
    },

    markAsSent: function (message) {
        var date = $.format.date(new Date(message.date), "dd/MM HH:mm");
        $('#' + message.id + ' > .date').html(date);
        $('#' + message.id + ' > .icon').removeClass('glyphicon-time');
        $('#' + message.id + ' > .icon').addClass('glyphicon-ok');
    },

    partGuid: function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

    fetchRooms: function (rooms) {
        var $ul = $('#rooms');
        $ul.empty();

        rooms.forEach(function (room) {
            $ul.append(
                '<li class="active">' +
                    '<a href="#">' +
                        '<span class="badge pull-right">' + room.clients.length + '</span>' +
                        room.name.toUpperCase() +
                    '</a>' +
                '</li>'
            );
            
            room.clients.forEach(function (client) {
                $ul.append('<li><a href="#">' + client.email + '</a></li>');
            });
        });
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