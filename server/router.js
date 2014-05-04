var authorize = require('./authentication/authorize'),
    widgetChat = require('./routes/widgetChat'),
    
    signup = require('./routes/suport/signup'),

    home = require('./routes/sample/home'),
    login = require('./routes/sample/login'),
    logout = require('./routes/sample/logout'),
    withWidget = require('./routes/sample/withWidget');

module.exports = function (app) {

    app.get('/bate-papo', authorize, widgetChat.get);
    app.post('/bate-papo', widgetChat.post);

    app.get('/suporte/criar-conta', signup.get);
    app.post('/suporte/criar-conta', signup.post);

    app.get('/exemplo/', authorize, home.get);

    app.get('/exemplo/entrar', login.get);
    app.post('/exemplo/entrar', login.post);

    app.get('/exemplo/sair', logout.get);
    
    app.get('/exemplo/com-widget', withWidget.get);

};