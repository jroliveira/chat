var passport = require('passport');

exports.get = function (req, res) {
    var message = req.flash('loginMessage');

    if (message.length === 0)
        message = [{ message: '', type: '' }];

    res.render('sample/login/index', {
        message: message[0].message,
        type: message[0].type
    });
};

exports.post = passport.authenticate('local-login', {
    successRedirect: '/exemplo/',
    failureRedirect: '/exemplo/entrar',
    failureFlash: true
});