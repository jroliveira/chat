﻿var passport = require('passport');

exports.post = function(req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		if (err) return next(err);
		
		var message = req.flash('loginMessage');

		if (message.length === 0)
			message = [{ message: '', type: '' }];

		if (!user) 
			return res.json({ success: false, message: message[0].message, type: message[0].type });
		
		req.logIn(user, function(err) {
			if (err) return next(err);
			
			return res.json({ success: true, message: null, type: null });
		});

	})(req, res, next);
};