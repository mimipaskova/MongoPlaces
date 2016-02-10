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
  db.models.places.find({name:'CSS'})
  .then(function (places) {
    // console.log(places);
    // var placesMap = {};
    // places.forEach(function(place) {
    //   placesMap[place._id] = place;
    // });
    // resp.session.places = places;
    resp.json(places);
    // resp.status(200).end();
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
// Create HTTP server.
http.createServer(app).listen(3000);

module.exports = app;