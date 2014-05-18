MyMessageView = MessageView.extend({

    className: 'right clearfix',

    initialize: function () {
    	this.template = templates.get('chat/my-message');

        var self = this;
        localforage.ready(function () {
            localforage.getItem('indexes', function (index) {
                var key = index + 1;
                        
                localforage.removeItem('indexes', function () {
                    localforage.setItem('indexes', key);
                            
                    var message = { id: self.model.id, msg: self.model.msg, sent: 0 };
                    localforage.setItem(key, message);
                });
            });
        });
    }

});