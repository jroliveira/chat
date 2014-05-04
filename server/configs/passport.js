var passport = require('passport'),
    passportLocal = require('passport-local'),
    Account = require('./../models/Account');

module.exports = function () {

    passport.serializeUser(function (account, done) {
        done(null, account.id);
    });

    passport.deserializeUser(function (id, done) {
        Account.findById(id, function (err, account) {
            done(err, account);
        });
    });

    passport.use('local-signup', new passportLocal.Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        Account.findOne({ 'email': email }, function (err, account) {
            if (err) return done(err);

            if (account)
                return done(null, false, req.flash('signupMessage', 'Este e-mail já esta cadastrado'));

            var newAccount = new Account();

            if (!newAccount.validEmail(email))
                return done(null, false, req.flash('signupMessage', 'O e-mail não é válido'));

            newAccount.email = email;
            newAccount.password = newAccount.generateHash(password);

            newAccount.save(function (err) {
                if (err) throw err;

                return done(null, newAccount, req.flash('loginMessage', { message: 'Conta criada com sucesso', type: 'alert alert-success' }));
            });
        });
    }));

    passport.use('local-login', new passportLocal.Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        Account.findOne({ 'email': email }, function (err, account) {
            if (err) return done(err);

            if (!account)
                return done(null, false, req.flash('loginMessage', { message: 'E-mail ou senha inválida', type: 'alert-danger' }));

            if (!account.validPassword(password))
                return done(null, false, req.flash('loginMessage', { message: 'E-mail ou senha inválida', type: 'alert-danger' }));

            req.session.user = account;

            return done(null, account);
        });
    }));

};