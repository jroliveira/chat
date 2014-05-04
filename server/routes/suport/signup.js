var passport = require('passport');

exports.get = function (req, res) {
    res.render('suport/signup/index', { message: req.flash('signupMessage') });
};

exports.post = passport.authenticate('local-signup', {
    successRedirect: '/exemplo/entrar',
    failureRedirect: '/suporte/criar-conta',
    failureFlash: true
});