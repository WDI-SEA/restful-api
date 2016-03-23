var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.get("/", function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.send({message: "An error occurred when loading users"});
    } else {
      res.send(users);
    }
  });
});

router.post("/", function(req, res) {
  var user = new User(req.body);
  user.save(function(err) {
    if (err) return res.send("An error occurred when creating the user");
    res.send(user);
  });
});

module.exports = router;