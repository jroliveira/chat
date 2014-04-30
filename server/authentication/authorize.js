module.exports = function(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/entrar?redirect={0}'.format(req.originalUrl));
};