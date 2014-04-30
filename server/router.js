var login = require('./routes/login'),
    home = require('./routes/home');

module.exports = function (app) {

    app.get('/', home.index);

    app.get('/login', login.get);

};