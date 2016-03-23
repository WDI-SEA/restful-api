var express = require("express");
var Coffee = require("../models/coffee");
var router = express.Router();

//display all coffees
router.get("/", function(req, res) {
	Coffee.find(function(err, coffees) {
		if (err) return res.send({ message: "Error: Unable to find coffees." });

		res.send(coffees);
	});
});

//create a new coffee
router.post("/", function(req, res) {
	var coffee = new Coffee(req.body);
	coffee.save(function(err) {
		if (err) return res.send({ message: "Error: Could not create coffee. Try again." });

		res.send(coffee);
	});
});

//display a specific coffee
router.get("/:id", function(req, res) {
	Coffee.findById(req.params.id, function(err, coffee) {
		if (err || !coffee) return res.send({ message: "Coffee not found" });

		res.send(coffee);
	});
});

//edit a specific coffee
router.put("/:id", function(req, res) {
	Coffee.findById(req.params.id, function(err, coffee) {
		if (err || !coffee) return res.send({ message: "Coffee not found" });

		if (req.body.name) coffee.name = req.body.name;
		if (req.body.size) coffee.size = req.body.size;
		if (req.body.shots) coffee.shots = req.body.shots;
		if (req.body.milk_type) coffee.milk_type = req.body.milk_type;

		coffee.save(function(err) {
			if (err) return res.send({ message: "Error: Could not edit coffee. Try again." });

			res.send(coffee);
		});
	});
});

//delete a specific coffee
router.delete("/:id", function(req, res) {
	Coffee.remove({ _id: req.params.id}, function(err) {
		if (err) return res.send({ message: "Coffee not found" });
		res.send({ message: "Coffee deleted" });
	});
});

module.exports = router;