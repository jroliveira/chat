mongoose = require('mongoose');
bcrypt = require('bcrypt-nodejs');
        
var accountSchema = mongoose.Schema ({
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String, trim: true, required: true }
});
        
accountSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
        
accountSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

accountSchema.methods.validEmail = function(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(email);
};
       
mongoose.model('Account', accountSchema);