var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var User = require("./models/user");
var Coffee = require("./models/coffee");
var app = express();

var secret = "this_is_my_super_secret_secret";

mongoose.connect("mongodb://localhost:27017/coffee-api");

app.use("/api", expressJWT(
	{
		secret: secret
	}
).unless({ method: "POST" }));

app.use(function (err, req, res, next) {
	if (err.name === "UnauthorizedError") {
		res.status(401).send({ message: "You need an authorization token to view this information." });
	}
});

app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/users", require("./controllers/users"));
app.use("/api/coffees", require("./controllers/coffees"));


app.post("/api/auth", function(req, res) {
	User.findOne(
		{
			email: req.body.email
		},
		function(err, user) {
			if (err || !user) {
				res.send({ message: "Invalid user" });
			} else {
				user.authenticated(req.body.password, function(err, result) {
					if (err || !result) {
						res.send({ message: "Invalid password" });
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
});

app.listen(3000);