var express = require('express');
var Coffee = require('../models/coffee');
var router = express.Router();

router.get('/', function(req, res) {
  Coffee.find(function(err, coffees) {
    if (err) return res.send({message: 'An error occurred when finding coffees'});

    res.send(coffees);
  });
});

router.post('/', function(req, res) {
  var coffee = new Coffee(req.body);
  coffee.save(function(err) {
    if (err) return res.send({message: 'An error occurred when creating a coffee'});
    res.send(coffee);
  });
});

router.get('/:id', function(req, res) {
  Coffee.findById(req.params.id, function(err, coffee) {
    if (err) return res.send({message: 'No coffee found'});
    res.send(coffee);
  });
});

router.put('/:id', function(req, res) {
  Coffee.findById(req.params.id, function(err, coffee) {
    if (err) return res.send({message: 'No coffee found'});

    if (req.body.name) coffee.name = req.body.name;
    if (req.body.size) coffee.size = req.body.size;
    if (req.body.size) coffee.shots = req.body.shots;
    if (req.body.size) coffee.milk = req.body.milk;

    coffee.save(function(err) {
      if (err) return res.send({message: 'Error occurred when editing the coffee'});
      res.send(coffee);
    });
  });
});

router.delete('/:id', function(req, res) {
  Coffee.remove({_id: req.params.id}, function(err) {
    if (err) return res.send({message: 'No coffee found'});
    res.send({message: 'coffee deleted'});
  });
});

module.exports = router;
