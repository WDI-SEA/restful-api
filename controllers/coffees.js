var express = require('express');
var Coffee = require('../models/coffee');
var router = express.Router();

router.get('/', function(req, res) {
  Coffee.find(function(err, coffees) {
    if (err) return res.send({message: 'An error occured when finding coffees'});
    res.send(coffees);
  });
});

router.post('/', function(req, res) {
  var coffee = new Coffee(req.body);
  coffee.save(function(err) {
    if(err) return res.send({message: 'An error occured when brewing coffee'});
    res.send(coffee);
  });
});

router.get('/:id', function(req, res) {
  Coffee.findById(req.params.id, function(err, coffee) {
    if(err) return res.send({message: 'No coffee found'});
    res.send(coffee);
  });
});

router.put('/:id', function(req, res) {
  Coffee.findById(req.params.id, function(err, coffee) {
    if(err) return res.send({message: 'No coffee found'});
    
    if(req.body.name) coffee.name = req.body.name;
    if(req.body.size) coffee.size = req.body.size;
    if(req.body.shots) coffee.shots = req.body.shots;
    if(req.body.milkType) coffee.milkType = req.body.milkType;
    if(req.body.syrup) coffee.syrup = req.body.syrup;

    coffee.save(function(err) {
      if(err) return res.send({message: 'An error occurred while fixing the coffee'});
      res.send(coffee);
    });
  });
});

router.delete('/:id', function(req, res) {
  Coffee.remove({_id: req.params.id}, function(err) {
    if(err) return res.send({message: 'No coffee found'});
    res.send({message: 'Coffee deleted'});
  });
});

module.exports = router;