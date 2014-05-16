FriendMessageView = MessageView.extend({

    className: 'left clearfix',

    initialize: function () {
        this.template = $('#friendMessageTemplate').html();
    }

});