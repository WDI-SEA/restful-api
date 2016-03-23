var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var CoffeeSchema = mongoose.Schema({
	name: String,
	size: String,
	shots: Number,
	milk_type: String
});

CoffeeSchema.set("toJSON", {
	transform: function(doc, ret, options) {
		var returnJson = {
			id: ret._id,
			name: ret.name,
			size: ret.size,
			shots: ret.shots,
			milk_type: ret.milk_type
		};
		return returnJson;
	}
});

CoffeeSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res ? this : false);
      }
  });
}

module.exports = mongoose.model('Coffee', CoffeeSchema);