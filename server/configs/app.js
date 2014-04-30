var express = require('express'),
    swig = require('swig'),
    path = require('path'),
    passport = require('passport'),
    flash = require('connect-flash'),
    consolidate = require('consolidate');

module.exports = function (app) {

    app.configure(function () {

        app.use(express.json());
        app.use(express.urlencoded());

        app.engine('html', swig.renderFile);
        app.set('views', path.join(__dirname, '/../../client/views'));
        app.set('view cache', false);
        swig.setDefaults({ cache: false });
        app.set('view engine', 'html');
        app.use('/client', express.static(path.join(__dirname, '/../../client')));

        app.use(express.cookieParser());
        app.use(express.session({ secret: 'secretsession' }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());

    });

};