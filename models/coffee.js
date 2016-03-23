var mongoose = require('mongoose');

var CoffeeSchema = mongoose.Schema({
  name: String,
  size: String,
  shots: Number,
  milk: String
});

CoffeeSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            size: ret.size,
            name: ret.name,
            shots: ret.shots,
            milk: ret.milk
        };
        return returnJson;
    }
});



module.exports = mongoose.model("Coffee", CoffeeSchema);