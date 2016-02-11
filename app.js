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
  console.log("rfetfwegwergew");
    // db.models.users.findOne({
    //     email: req.body.username
    // }).then(function (user) {
    //   console.log(email);
    //     resp.status(403).end();
    // }, function (err) {
    //   console.log("ERRR");
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
    // });
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

app.get('/api/profile', function(req, resp) {
  resp.json(req.session.user);
});

app.get('/api/map', function(req, resp) {
  db.models.places.find({})
  .then(function (places) {
    // console.log(places);
    resp.json(places);
  }, function(err) {
    console.error('Cannot find any places', err);
    resp.status(403).end();
  });
});

app.post('/api/map/similar', function(req, resp) {
  db.models.places.find({rating: req.body.rating})
  .then(function (places) {
    console.log(places);
    resp.json(places);
  }, function(err) {
    console.error('Cannot find any places', err);
    resp.status(403).end();
  });
});

app.post('/map', function(req, resp) {
  resp.status(200).end();
});

app.post('/profile', function(req, resp) {
  resp.status(200).end();
});

app.post('/profile/removePlace', function (req, resp) {
  db.models.users.findById(place._id, function(err, foundUser) {
    db.models.places.findById(user._id, function(err, foundPlace) {
      foundUser.favouritePlaces.filter(function (favouritePlace) {
        return favouritePlace != foundPlace._id;
      });
      foundPlace.followingUsers.filter(function(err, favouriteUser) {
        return favouriteUser != foundUser._id;
      });
    });
  });
}

// Create HTTP server.
http.createServer(app).listen(3000);

module.exports = app;