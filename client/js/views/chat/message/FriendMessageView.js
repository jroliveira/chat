define([
    'views/chat/message/MessageView',
    
    'text!templates/chat/friend-message.html'
], function (
    MessageView,
     
    template
) {

    var FriendMessageView = MessageView.extend({

        className: 'left clearfix',

        initialize: function () {
            this.template = template;
        }

    });

    return FriendMessageView;

});