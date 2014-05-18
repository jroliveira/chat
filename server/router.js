var authorize = require('./authentication/authorize'),

	signup = require('./routes/signup'),
	login = require('./routes/login'),
	logout = require('./routes/logout');

module.exports = function (app) {

	app.get('/criar-conta', login.get);
	app.post('/criar-conta', signup.post);

	app.get('/entrar', login.get);
	app.post('/entrar', login.post);
	
	app.get('/sair', logout.get);

};