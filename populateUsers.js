var crypto = require('crypto'),
	db = require('./db_connector.js');

db.models.users.where({}).update({$set: {favouritePlaces: []}}).exec();

