exports.post = function (req, res) {
    req.logout();
    res.json({ success: true });
};