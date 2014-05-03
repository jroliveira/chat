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
                database.getItem('indexes', function (index) {
                    var key = index + 1;
                        
                    database.removeItem('indexes', function () {
                        database.setItem('indexes', key);
                            
                        var message = { id: self.model.id, msg: self.model.msg, sent: 0 };
                        database.setItem(key, message);
                    });
                });
            });
        }

    });

    return MyMessageView;

});