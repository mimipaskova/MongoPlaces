var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = Promise;

var usersSchema = new Schema({
	email: String,
	password: String,
	favouritePlaces: [String],
	salt: String
});

exports.models = {
	users: mongoose.model('user', usersSchema, 'users')
};

mongoose.connect('localhost:27017/takeahike');