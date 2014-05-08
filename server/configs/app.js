var express = require('express'),
    swig = require('swig'),
    path = require('path'),
    passport = require('passport'),
    flash = require('connect-flash'),
    consolidate = require('consolidate'),
    mongoose = require('mongoose'),
	Marinet = require('./../../node_modules/marinet-provider-nodejs/lib/MarineteRestfulProvider');

if (!String.prototype.format) {
    String.prototype.format = function () {

        var args = arguments;
        var sprintfRegex = /\{(\d+)\}/g;

        var sprintf = function (match, number) {
            return number in args ? args[number] : match;
        };

        return this.replace(sprintfRegex, sprintf);
    };
}

global.KEY = 'express.sid';
global.SECRET = 'express';

global.store = new express.session.MemoryStore();
global.cookie = express.cookieParser(SECRET);

module.exports = function (app) {

	var provider = new Marinet({ 
		rootUrl: 'http://marinet.apphb.com',
        appName: 'chat',
        appKey: 'kK9IlVj7fkyPQYplgsKysw'
    });

    app.configure(function () {

        app.use(cookie);
        app.use(express.session({
            secret: SECRET,
            key: KEY,
            store: store,
            cookie: {
                maxAge: 1000 * 60 * 24
            }
        }));

        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
            next();
        });
        
        app.use(express.json());
        app.use(express.urlencoded());

        app.engine('html', swig.renderFile);
        app.set('views', path.join(__dirname, '/../../client/views'));
        app.set('view cache', false);
        swig.setDefaults({ cache: false });
        app.set('view engine', 'html');
        app.use('/client', express.static(path.join(__dirname, '/../../client')));

        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());

        app.use(app.router);
        app.use(function (err, req, res, next) {
            provider.error({
                user: req.user ? req.user.email : 'unauthenticated',
                message: err.message,
                exception: err.stack
            });
            
            res.send(500);
        });

    });

};