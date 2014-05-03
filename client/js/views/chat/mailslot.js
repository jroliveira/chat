define([
    'jquery',
    'localforage'
], function (
    $,
    database
) {

    var server,
        connected = false;

    function verify() {
        if (!connected) return;
        
        database.length(function (length) {
            for (var i = 0; i < length; ++i) {
                database.key(i, function (key) {
                    if (key != 'indexes') {
                        database.getItem(key, function (message) {
                            if (message.sent === 1) return;

                            var newMessage = { id: message.id, msg: message.msg, key: key };

                            server.emit('new message', newMessage);

                            message.sent = 1;
                            database.removeItem(key, function () {
                                database.setItem(key, message);
                            });
                        });
                    }
                });
            }
        });

        setTimeout(verify, 5000);
    }

    return {

        initialize: function (socket) {
            $(document).on('connected', $.proxy(this.connected, this));
            
            server = socket;

            verify();
        },
        
        connected: function(event, isConnected) {
            connected = isConnected;

            verify();
        },

    };

});
