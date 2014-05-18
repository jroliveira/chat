var passport = require('passport');

exports.post = passport.authenticate('local-signup', {
    successRedirect: '/entrar',
    failureRedirect: '/entrar',
    failureFlash: true
});