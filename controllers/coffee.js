var express = require('express');
var User = require('../models/coffee');
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
    if (err) return res.send({message: 'Coffee not found'});
    res.send(coffee);
  });
});

router.put('/:id', function(req, res) {
  Coffee.findById(req.params.id, function(err, coffee) {
    if (err) return res.send({message: 'Coffee not found'});

    if (req.body.name) coffee.name = req.body.name;
    if (req.body.size) coffee.size = req.body.size;
    if (req.body.shots) coffee.shots = req.body.shots;
    if (req.body.milk) coffee.milk = req.body.milk;

    user.save(function(err) {
      if (err) return res.send({message: 'Error occurred when editing the user'});
      res.send(user);
    });
  });
});

router.delete('/:id', function(req, res) {
  Coffee.remove({_id: req.params.id}, function(err) {
    if (err) return res.send({message: 'Coffee not found'});
    res.send({message: 'Coffee successfully deleted'});
  });
});

module.exports = router;