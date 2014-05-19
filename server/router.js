var signup = require('./routes/api/signup'),
	login = require('./routes/api/login'),
	logout = require('./routes/api/logout'),
    
    home = require('./routes/home');

module.exports = function (app) {

    app.get('/', home.get);
    
    /* api */
	
    app.post('/api/sair', logout.post);
    app.post('/api/entrar', login.post);
	app.post('/api/criar-conta', signup.post);

};