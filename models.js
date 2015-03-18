var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = mongoose.model('User', {
    // _id: Number,
    email: String,
    password: String,
    phone_number: String,
    name: String
    // items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

var Items =  mongoose.model('Item', {
    _creator:{type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    description: String,
    url: [String]
});

exports.User = User;
exports.Items = Items;