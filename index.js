var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var User = require('./models/user')
var app = express();

var secret = "yesterday_upon_the_stair_I_met_a_man_who_wasnt_there";

mongoose.connect('mongodb://localhost:27017/coffeeauthusers');

app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/users', require('./controllers/users'));
app.use('/api/coffees', require('./controllers/coffee'));
app.use("/api/coffees", expressJWT({ secret: secret }).unless({ method: "POST" }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post("/api/auth", function(req, res) {
  User.findOne(
  {
    email: req.body.email,
  },
  function(err, user) {
    if (err || !user) {
      res.send( {message: "user not found"});
    } else {
      user.authenticated(req.body.password, function(err, result) {
        if (err || !result) {
          res.send({
              message: "Wrong password"
          });
        } else {
          var token = jwt.sign(user, secret);
          res.send({
            user: user,
            token: token
          });
          }
        });
      }
    }
  );
})

app.listen(3000);