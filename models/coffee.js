var mongoose = require("mongoose");


var CoffeeSchema = mongoose.Schema({
	name: String,
	type: String,
	shots: Number,
	type_of_milk: String
});


module.exports = mongoose.model('Coffee', CoffeeSchema);