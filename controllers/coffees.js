var express = require('express');
var Coffee = require('../models/coffee');
var router = express.Router();



router.get("/", function(req,res){
	Coffee.find({}, function(err,coffee){
		if(err){
			res.send({message:"Sorry there was an error!!"})
		} else {
			res.send(coffee);
		}
	});
});

router.post("/", function(req,res){
	var coffee = new Coffee(req.body);
	coffee.save(function(err){
		if(err){
			res.send({message: "Your Coffee has an error!!"})
		} else {
			res.send(coffee);
		}
	});
});

router.get("/:id", function(req,res){
	Coffee.findById(req.params.id, function(err, coffee){
		if(err) return res.send({message: "There was an error finding your coffee!"});
		res.send(coffee)
	});
});

router.put("/:id", function(req, res){
	Coffee.findById(req.params.id, function(err, coffee){
		if(err) return res.send({message: "There was an error finding your coffee!"});
		if(req.body.name) coffee.name = req.body.name;
		if(req.body.type) coffee.type = req.body.type;
		if(req.body.size) coffee.size = req.body.size;
		if(req.body.type_of_milk) coffee.type_of_milk = req.body.type_of_milk;
		coffee.save(function(err){
			if(err) return res.send({message: "Sorry there was an error updating your coffee!"});	
			res.send(coffee);
		});
	});
});

router.delete("/:id", function(req,res){
	Coffee.remove({_id : req.params.id}, function(err){
		if(err) return res.send({message: "Yo don't try to get ride of me"})
		res.send({message: "Coffee was deleted!"});
	});
});


module.exports = router;