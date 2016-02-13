var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var crypto = require('crypto');

var db = require('./db_connector.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'gbreugbe3'}));

app.use(express.static('./public'));

app.post('/login', function (req, resp) {
  db.models.users.findOne({
      email: req.body.username
  }).then(function (user) {
    var hasher = crypto.createHash('sha1');
    hasher.update(user.salt + req.body.password);
    var possiblePassword = hasher.digest('hex');
    if(possiblePassword === user.password) {
      req.session.user = user;
      resp.status(200).end();
    } else {
      resp.status(403).end();
    }

  }, function (err) {
      console.error('Cannot find user', err);
      resp.status(403).end();
  });
});

app.post('/register', function (req, resp) {
  var user = db.models.users;
  var newUser = new user();
  newUser.email = req.body.username;
  newUser.password = req.body.password;
  newUser.salt = crypto.randomBytes(8).toString('hex');
  var hash = crypto.createHash('sha1');
  hash.update(newUser.salt + newUser.password);
  newUser.password = hash.digest('hex');
  newUser.save(function(err) {
    if(err) {
      console.error('Cannot find user', err);
      resp.status(403).end();
    } else {
      req.session.user = newUser;
      resp.status(200).end();
    }
  });
});

app.post('/logout', function(req, resp) {
  req.session.user = null;
  resp.status(200).end();
});

app.use('/api', function (req, resp, next) {
  if (req.session.user) {
    next();
  } else {
    resp.status(401).end();
  }
});

function dbError (resp) {
  return function (err) {
    console.error(err);
    resp.sendStatus(500);
  }
}

function getProfile(userId) {
  return db.models.users.findById(userId)
  .select('email favouritePlaces')
  .populate({path: 'favouritePlaces', model: 'place'});
}

app.get('/api/profile', function(req, resp) {
  getProfile(req.session.user._id)
  .then(function (user) {
    resp.status(200).send(user);
  }, dbError(resp));
});

// TODO use aggregation for mongo query
app.get('/api/places', function(req, resp) {
  db.models.places.find({}).lean()
  .then(function (places) {
    return db.models.users.findById(req.session.user._id)
    .then(function(user) {
      places.forEach(function(place) {
        place.isFavourite = (user.favouritePlaces.indexOf(place._id) !== -1);
      });
      resp.json(places);
    });
  }, dbError(resp));
});

app.get('/api/map/by-rating/:rating', function(req, resp) {
  db.models.places.find({rating: req.params.rating})
  .then(function (places) {
    resp.json(places);
  }, dbError(resp));
});

app.get('/api/map/by-type/:type', function(req, resp) {
  db.models.places.find({type: req.params.type})
  .then(function (places) {
    resp.json(places);
  }, dbError(resp));
});

app.get('/api/map/near/:la/:lo', function(req, resp) {
  var point = { type : "Point", coordinates : [parseFloat(req.params.la),parseFloat(req.params.lo)] };
  console.log(point);
   db.models.places.aggregate([
      {
        $geoNear: { near: point, num : 5, spherical : true, distanceField: "dist.calculated", }
      }
    ])
   .exec()
   .then(function(places) {
    resp.json(places);
   }, dbError(resp));
});


app.delete('/favourite/:placeId', function (req, resp) {
  db.models.users.findById(req.session.user._id)
  .then(function(user) {
    user.favouritePlaces = user.favouritePlaces.filter(function(favouritePlaceId) {
      return !favouritePlaceId.equals(req.params.placeId);
    });
    return user.save();
  })
  .then(function (user) {
    return db.models.places.populate(user, 'favouritePlaces');
  })
  .then(function (populated) {
    resp.json(populated);
  }, dbError(resp));
});

app.post('/favourite/:placeId', function (req, resp) {
  console.log(req.params.placeId);
  db.models.users.findOneAndUpdate({_id: req.session.user._id},
    {$addToSet: {favouritePlaces: req.params.placeId}})
  .then(function () {
    resp.sendStatus(200);
  }, dbError(resp));
});

app.get('/top', function (req, resp) {
  db.models.places.aggregate( [
  { $sort: {'likes': -1} },
  {
    $group:
    {
      _id: "$type",
      places:
      {
        $push:
        {
          name: "$name",
          likes: "$likes"
        },
      }
    }
  },
  {
  $project: {
    _id: 1,
    places: { $slice: ["$places", 3]}
  }
  }
])
  .exec()
  .then(function(data) {
    console.log(data);
    resp.json(data);
  }, dbError(resp));
});

// Create HTTP server.
http.createServer(app).listen(3000);

module.exports = app;