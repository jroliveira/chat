chatApp.views.chat.message.FriendMessageView = chatApp.views.chat.message.MessageView.extend({

    className: 'left clearfix',

    initialize: function () {
    	this.template = chatApp.infraestructure.templates.get('chat/friend-message');
    }

});