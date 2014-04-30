var home = require('./routes/home'),
    login = require('./routes/login'),
    signup = require('./routes/signup'),
    authorize = require('./authentication/authorize');

module.exports = function (app) {

    app.get('/', authorize, home.index);

    app.get('/entrar', login.get);
    app.post('/entrar', login.post);
    
    app.get('/criar-conta', signup.get);
    app.post('/criar-conta', signup.post);

};