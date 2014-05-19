exports.get = function (req, res) {
    res.render('index', {
        relativePath: 'http://widget-chat.herokuapp.com:80'
		//relativePath: 'http://localhost:4000'
	});
};