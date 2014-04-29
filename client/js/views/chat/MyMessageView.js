define([
    'views/chat/MessageView',

    'text!templates/chat/my-message.html'
], function (
    MessageView,
    
    template
) {

    var MyMessageView = MessageView.extend({

        className: 'right clearfix',

        initialize: function () {
            this.template = template;
        }

    });

    return MyMessageView;

});