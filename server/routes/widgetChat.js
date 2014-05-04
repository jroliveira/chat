var passport = require('passport');

exports.get = function (req, res) {
    res.render('chat', { relativePath: 'http://widget-chat.herokuapp.com' });
};

exports.post = passport.authenticate('local-login', {
    successRedirect: '/bate-papo',
    failureRedirect: '/exemplo/entrar',
    failureFlash: true
});