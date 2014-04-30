var passport = require('passport');

exports.get = function (req, res) {
    res.render('signup/index', { message: req.flash('signupMessage') });
};

exports.post = passport.authenticate('local-signup', {
    successRedirect: '/entrar',
    failureRedirect: '/criar-conta',
    failureFlash: true
});