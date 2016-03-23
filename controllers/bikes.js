var express = require('express');
var Bike = require('../models/bike');
var router = express.Router();

router.get('/', function(req, res) {
  Bike.find(function(err, bikes) {
    if (err) return res.send({message: 'An error occurred when finding bikes'});

    res.send(bikes);
  });
});

router.post('/', function(req, res) {
  var bike = new Bike(req.body);
  bike.save(function(err) {
    if (err) return res.send({message: 'An error occurred when creating a bike'});
    res.send(bike);
  });
});

router.get('/:id', function(req, res) {
  Bike.findById(req.params.id, function(err, bike) {
    if (err) return res.send({message: 'No bike found'});
    res.send(bike);
  });
});

router.put('/:id', function(req, res) {
  Bike.findById(req.params.id, function(err, bike) {
    if (err) return res.send({message: 'No bike found'});

    if (req.body.name) bike.name = req.body.name;
    if (req.body.email) bike.email = req.body.email;

    bike.save(function(err) {
      if (err) return res.send({message: 'Error occurred when editing the bike'});
      res.send(bike);
    });
  });
});

router.delete('/:id', function(req, res) {
  Bike.remove({_id: req.params.id}, function(err) {
    if (err) return res.send({message: 'No bike found'});
    res.send({message: 'bike deleted'});
  });
});

module.exports = router;