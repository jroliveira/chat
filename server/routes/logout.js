exports.get = function (req, res) {
    req.logout();
    res.redirect('/entrar');
};