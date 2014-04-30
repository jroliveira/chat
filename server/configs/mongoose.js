var mongoose = require('mongoose');

module.exports = function () {

    var config = {
        user: 'sa',
        password: 'sa',
        server: 'oceanic.mongohq.com',
        port: '10067',
        database: 'chat'
    };

    var connectionString = 'mongodb://' + config.user + ':' + config.password + '@' + config.server + ':' + config.port + '/' + config.database;

    mongoose.connect(connectionString);

};