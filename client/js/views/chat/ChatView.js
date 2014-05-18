chatApp.views.chat.ChatView = Backbone.View.extend({

    events: {
        'click #send': 'send',
        'keypress #message': 'enter',
        'click .panel-primary > .panel-heading': 'toggle'
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
	
	markAsSent: function(message) {
		var date = $.format.date(new Date(message.date), "dd/MM HH:mm");
		$('#' + message.id + ' > .date').html(date);
		$('#' + message.id + ' > .icon').removeClass('glyphicon-time');
		$('#' + message.id + ' > .icon').addClass('glyphicon-ok');
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
    },

    toggle: function (e) {
    	$('.chat > div >  .panel > .panel-body, .chat > div > .panel > .panel-footer').toggle();
    }

});