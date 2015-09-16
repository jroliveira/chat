'use strict';

const
  express = require('express'),
  swig = require('swig'),
  path = require('path');

module.exports = function (app) {
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
  app.set('views', path.join(__dirname, '/../views'));
  app.set('view cache', false);
  swig.setDefaults({
    cache: false
  });
  app.set('view engine', 'html');
  app.use('/public', express.static(path.join(__dirname, '/../public')));

  app.use(app.router);
  app.use(function (err, req, res, next) {
    console.log(err.message);
    res.send(500);
  });
};