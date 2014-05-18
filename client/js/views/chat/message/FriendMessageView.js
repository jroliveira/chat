FriendMessageView = MessageView.extend({

    className: 'left clearfix',

    initialize: function () {
    	this.template = templates.get('chat/friend-message');
    }

});