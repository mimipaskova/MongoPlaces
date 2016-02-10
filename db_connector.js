var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = Promise;

var usersSchema = new Schema({
	email: String,
	password: String,
	favouritePlaces: [String],
	salt: String
});

var placesSchema = new Schema({
	name: String,
	loc: {
		type: { type: String },
		coordinates: []
	},
	type: String,
	descrition: String,
	workingTime: Number,
	rating: Number,
	followingUsers:[String],
	likes: Number
});

// index for GPS coordinates
placesSchema.index({ loc: '2dsphere' });
placesSchema.index({type: 1});
placesSchema.index({rating: 1, likes: 1});

// TODO required and not required fields

exports.models = {
	users: mongoose.model('user', usersSchema, 'users'),
	places: mongoose.model('place', placesSchema, 'places')
};

mongoose.connect('localhost:27017/takeahike');