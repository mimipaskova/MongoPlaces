var crypto = require('crypto'),
	db = require('./db_connector.js');

// var user1 = {
// 	email: 'mi@mi',
// 	salt: string
// 	password: mimi
// 	favouritePlaces: []
// }

exports.registerUser = function (user) {
	user.salt = crypto.randomBytes(8).toString('hex');
	var hash = crypto.createHash('sha1');
	hash.update(user.salt + user.password);
	user.password = hash.digest('hex');

	return db.models.users.create(user);
}