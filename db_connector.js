var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = Promise;

var usersSchema = new Schema({
	email: {type: String, unique: true, required: true},
	password: {type: String, required:true},
	favouritePlaces: [Schema.Types.ObjectId],
	salt: {type: String, required:true}
});

var placesSchema = new Schema({
	name: {type: String, required: true},
	loc: {
		type: { type: String },
		coordinates: []
	},
	type: {type: String, required: true},
	description: String,
	workingTime: Number,
	rating: {type: Number, required: true},
	likes: Number
});

// index for GPS coordinates
placesSchema.index({ "loc.coordinates": '2dsphere' });
placesSchema.index({type: 1});
placesSchema.index({rating: 1, likes: 1});

// TODO required and not required fields

exports.models = {
	users: mongoose.model('user', usersSchema, 'users'),
	places: mongoose.model('place', placesSchema, 'places')
};

mongoose.connect('localhost:27017/takeahike');