var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var User = require('./models/user');
var Coffee = require('./models/coffee');
var app = express();
var secret = "mysecret";

mongoose.connect('mongodb://localhost:27017/restful-api');

app.use(
  "/api/coffees", 
  expressJWT(
    {
      secret: secret
    }
  )
);

app.use(function (err, req, res, next) {
  // send an appropriate status code & JSON object saying there was an error, if there was one.
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.use(bodyParser.urlencoded({ extended: false }));


// var evan = new User({
//   name: "Evan",
//   email: "email@email.com",
//   password: "password"
// });  

// evan.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("User evan created!");
//   }
// });

// var jolie = new User({
//   name: "Jolie",
//   email: "jolie@dogs.com",
//   password: "arfarf"
// });

// jolie.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("User jolie created!");
//   }
// });

// var latte = new Coffee({
//   name: "vanilla latte",
//   size: "large",
//   shots: 3,
//   milkType: "skim"
// })

// latte.save(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Coffee vanilla latte created!");
//   }
// })

app.use('/api/users', require('./controllers/users'));
app.use('/api/coffees', require('./controllers/coffees'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post("/api/auth", function(req, res) {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err || !user) {
        res.send({ message: "user not found" });
      } else {
        user.authenticated(req.body.password, function(err, result) {
          if (err || !result) {
            res.send({ message: "Wrong password, bozo"});
          } else {
            var token = jwt.sign(user, secret);
            res.send({
              user: user,
              token: token
            })
          }
        });
      }
    }
  );
});

app.listen(3000);