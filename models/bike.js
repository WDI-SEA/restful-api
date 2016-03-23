var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');


var BikeSchema = mongoose.Schema({
  brand: String,
  model: String,
  size: Number,
  color: String,
  type: String
});

// Let's craft how our JSON object should look!
// http://mongoosejs.com/docs/api.html#document_Document-toObject
BikeSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            brand: ret.brand,
            model: ret.model,
            size: ret.size,
            color: ret.color,
            type: ret.type
        };
        return returnJson;
    }
});

BikeSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res ? this : false);
      }
  });
}


// Let's encrypt our passwords using only the model!
// This is a hook, a function that runs just before you save.
BikeSchema.pre('save', function(next) {
    var bike = this;

    // only hash the password if it has been modified (or is new)
    if (!bike.isModified('password')) return next();
    // bcrypt can come up with a salt for us (just pass it a number)
    bike.password = bcrypt.hashSync(bike.password, 10);
    next();
});

module.exports = mongoose.model('Bike', BikeSchema);