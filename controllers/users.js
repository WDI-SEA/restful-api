var express = require("express");
var User = require("../models/user");
var router = express.Router();

router.get("/", function(req, res) {
	User.find(function(err, users) {
		if (err) return res.send({ message: "Error: Could not find users. Try again." });
		res.send(users);
	});
});

router.post("/", function(req, res) {
	var user = new User(req.body);
	user.save(function(err) {
		if (err) return res.send({ message: "Error: Could not create user. Try again." });
		res.send(user);
	});
});

module.exports = router;
