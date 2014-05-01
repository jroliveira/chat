define([
    'localforage'
], function (
    database
) {

    var server;

    function verify() {
        database.length(function (length) {
            for (var i = 0; i < length; ++i) {
                database.key(i, function (key) {
                    database.getItem(key, function (message) {
                        if (message.sent === 1) return;

                        var newMessage = { id: message.id, msg: message.msg };
                        server.emit('new message', newMessage);

                        message.sent = 1;
                        database.removeItem(key, function () {
                            database.setItem(key, message);
                        });
                    });
                });
            }
        });

        setTimeout(verify, 5000);
    }

    return {

        initialize: function (socket) {
            server = socket;

            verify();
        }

    };

});
