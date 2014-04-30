exports.index = function (req, res) {
    var email = req.query.email;
    if (!email) return res.redirect('/login');

    var user = email.substring(0, email.indexOf('@') + 1);

    res.render('home/index', { user: user });
};