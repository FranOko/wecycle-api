var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = mongoose.model('User', {
    email: String,
    password: String,
    phone_number: String,
    name: String
});

var Items =  mongoose.model('Item', {
    _creator:{type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    description: String,
    url: [String]
});

exports.User = User;
exports.Items = Items;