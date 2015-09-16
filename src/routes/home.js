'use strict';

exports.get = function (req, res) {
  res.render('index', {
    relativePath: 'http://widget-chat.herokuapp.com:80',
    relativePathApi: 'http://widget-chat-api.herokuapp.com:80'
    //relativePath: 'http://localhost:4002',
    //relativePathApi: 'http://localhost:4001'
  });
};