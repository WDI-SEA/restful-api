var mongoose = require('mongoose');

var CoffeeSchema = mongoose.Schema({
  name: String,
  size: String,
  shots: Number,
  milkType: String,
  syrup: String
});

// CoffeeSchema.set('toJSON', {
//   transform: function(doc, ret, options) {
//     id: ret._id,
//     name: ret.name,
//     size: ret.size,
//     shots: ret.shots,
//     milkType: ret.milkType,
//     syrup: ret.syrup
//   };
//   return returnJson;
// });

module.exports = mongoose.model('Coffee', CoffeeSchema);
