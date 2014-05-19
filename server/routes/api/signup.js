var passport = require('passport'),
    Account = require('./../../models/Account');

exports.post = function (req, res) {
    var model = req.body;

    Account.findOne({ 'email': model.email }, function (err, account) {
        if (err)
            return res.json({ success: false, message: 'Erro ao buscar o e-mail.', type: 'alert-danger' });

        if (account)
            return res.json({ success: false, message: 'Este e-mail já esta cadastrado', type: 'alert-danger' });

        var newAccount = new Account();

        if (!newAccount.validEmail(model.email))
            return res.json({ success: false, message: 'O e-mail não é válido', type: 'alert-danger' });

        if (model.password !== model.confirmPassword)
            return res.json({ success: false, message: 'A confirmação da senha não é igual a senha', type: 'alert-danger' });

        newAccount.email = model.email;
        newAccount.password = newAccount.generateHash(model.password);

        newAccount.save(function (err) {
            if (err) throw err;

            return res.json({ success: true, message: 'Conta criada com sucesso', type: 'alert-success' });
        });
    });
};