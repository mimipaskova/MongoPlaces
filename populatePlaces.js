var crypto = require('crypto'),
	db = require('./db_connector.js');

db.models.places.remove({}).exec();

var place1 = {
		name:'Lom', 
		description:'gerugfergrgregreibgebguiewbguiewui',
		workingTime:8,
		rating:6,
		loc : {
			type: "Point",
			coordinates: [
				43.775561, 23.724615 ] 
			},
		type: "town",
		likes: 5};

var place2 = {
		name:'Sofia', 
		description:'gerugfergrgregreibgebguiewbguiewui',
		workingTime:8,
		rating:6,
		loc : {
			type: "Point",
			coordinates: [
				42.696465, 23.322129 ] 
			},
		type: "town",
		likes: 5};

var place3 = {
		name:'Paradise', 
		description:'gerugfergrgregreibgebguiewbguiewui',
		workingTime:8,
		rating:5,
		loc : {
			type: "Point",
			coordinates: [
				42.656608,
				23.317194 ] 
			},
		type: "mall",
		likes: 5};


var place4 = {
		name:'The mall', 
		description:'gerugfergrgregreibgebguiewbguiewui',
		workingTime:8,
		rating:8,
		loc : {
			type: "Point",
			coordinates: [
				42.660016,
				23.383455 ] 
			},
		type: "mall",
		likes: 4};

var place5 = {
		name:'Zemqta i horata', 
		description:'gerugfergrgregreibgebguiewbguiewui',
		workingTime:8,
		rating:8,
		loc : {
			type: "Point",
			coordinates: [
				42.679304,
				23.319812 ] 
			},
		type: "museum",
		likes: 30};

var place6 = {
		name:'Historical museum', 
		description:'gerugfergrgregreibgebguiewbguiewui',
		workingTime:8,
		rating:6,
		loc : {
			type: "Point",
			coordinates: [
				42.649577,
				23.292174 ] 
			},
		type: "museum",
		likes: 5};

var place7 = {
		name:'London', 
		description:'gerugfergrgregreibgebguiewbguiewui',
		workingTime:8,
		rating:8,
		loc : {
			type: "Point",
			coordinates: [
				51.507351,
				-0.127758 ] 
			},
		type: "town",
		likes: 30};

var place8 = {
		name:'Plovdiv', 
		description:'Big city',
		workingTime:8,
		rating:6,
		loc : {
			type: "Point",
			coordinates: [
				42.135408,
				24.745290 ] 
			},
		type: "city",
		likes: 5};		

db.models.places.create([place1, place2, place3, place4, place5, place6, place7, place8]);
