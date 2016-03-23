var mongoose = require("mongoose");

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

CoffeeSchema.pre("save", function(next) {
	var coffee = this;
	next();
});



module.exports = mongoose.model('Coffee', CoffeeSchema);