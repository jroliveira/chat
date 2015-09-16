chatApp.views.chat.message.UserLeftMessageView = chatApp.views.chat.message.MessageView.extend({

    className: 'left clearfix user-left',

    initialize: function () {
    	this.template = chatApp.infraestructure.templates.get('chat/userleft-message');
    }

});