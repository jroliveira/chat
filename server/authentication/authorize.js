module.exports = function (req, res, next) {
    if (req.isAuthenticated()) return next();

    return res.redirect('/exemplo/entrar?redirect={0}'.format(req.originalUrl));
};