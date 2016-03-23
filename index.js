var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var User = require('./models/user');
var Coffee = require('./models/coffee')
var app = express();

// A secret phrase that only your app knows, so encryption can be consistent. We'll use this later.
var secret = "mysupersecretpassword";

mongoose.connect('mongodb://localhost:27017/myauthenticatedusers');

app.use(
  '/api',
  expressJWT(
  {
    secret: secret
  }
  ).unless( {method: 'POST'}));

app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/users', require('./controllers/user'));
app.use('/api/coffees', require('./controllers/coffee'));
app.get('/', function(req,res) {
  res.sendFile(__dirname+'/views/index.html')
});

app.post('/api/auth', function(req, res) {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err || !user) {
        res.send({ message: 'user not found' });
      } else {
        user.authenticated(req.body.password, function(err, result) {
          if (err || !result) {
            res.send({
              message: 'Wrong username or password'
            });
          } else {
            var token = jwt.sign(user, secret);
            res.send ({
              user: user,
              token: token
            });
          }
        });
      }
    }
  );
});

app.listen(3000);