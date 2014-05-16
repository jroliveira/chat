var passport = require('passport');

exports.get = function (req, res) {
    //res.render('chat', { relativePath: 'http://widget-chat.herokuapp.com:80' });
    res.render('chat', { relativePath: 'http://localhost:4000' });
};

exports.post = passport.authenticate('local-login', {
    successRedirect: '/bate-papo',
    failureRedirect: '/exemplo/entrar',
    failureFlash: true
});