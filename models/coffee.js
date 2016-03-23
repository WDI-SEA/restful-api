var mongoose = require('mongoose');

var coffeeSchema = new mongoose.Schema({
  name: String,
  size: String,
  shots: Number,
  milkType: String
});

var Coffee = mongoose.model('Coffee', coffeeSchema);

module.exports = Coffee;