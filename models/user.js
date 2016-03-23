var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;