define([
    'localforage',
    
    'views/chat/message/MessageView',

    'text!templates/chat/my-message.html'
], function (
    database,
    
    MessageView,
    
    template
) {

    var MyMessageView = MessageView.extend({

        className: 'right clearfix',

        initialize: function () {
            this.template = template;

            var self = this;
            database.ready(function () {
                database.length(function (length) {
                    var message = { id: self.model.id, msg: self.model.msg, sent: 0 };

                    var index = length + 1;
                    database.setItem(index, message);
                });
            });
        }

    });

    return MyMessageView;

});