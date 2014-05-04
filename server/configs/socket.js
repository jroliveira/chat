module.exports = function (io) {

    io.set('log level', 1);

    io.set('authorization', function (data, accept) {
        cookie(data, {}, function (err) {
            if (err) return accept(null, false);
                
            var sessionId = data.signedCookies[KEY];
            store.get(sessionId, function (err, session) {
                if (err || !session) return accept(null, false);

                data.session = session;
                accept(null, true);
            });
        });
    });

};