var mongoose = require('mongoose');

var CoffeeSchema = mongoose.Schema({
  name: String,
  size: String,
  shots: Number,
  milk: String
});

// Let's craft how our JSON object should look!
// http://mongoosejs.com/docs/api.html#document_Document-toObject
CoffeeSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            Name: ret.name,
            Size: ret.size,
            Shots: ret.shots,
            Milk: ret.milk
        };
        return returnJson;
    }
});

module.exports = mongoose.model('Coffee', CoffeeSchema);