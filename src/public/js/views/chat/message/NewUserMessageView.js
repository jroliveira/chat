chatApp.views.chat.message.NewUserMessageView = chatApp.views.chat.message.MessageView.extend({

    className: 'left clearfix new-user',

    initialize: function () {
    	this.template = chatApp.infraestructure.templates.get('chat/newuser-message');
    }

});