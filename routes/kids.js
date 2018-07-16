var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('cme', ['kids']);
const Kid = require('../models/kid');

// Get All Kids
router.get('/kids', function(req, res, next) {
    Kid.find({}, function(err, kids) {
        if(err) {
            res.send("Error");
        }
        res.json(kids);
    })
});

// Get Single Task
router.get('/kid/:id', function(req, res, next){
    db.kids.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, kid){
        if(err){
            res.send(err);
        }
        res.json(kid);
    });
});

// Save Kid
router.post('/addkid', function(req, res, next){
    let newKid = new Kid({
        _id: req.body._id,
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        address: req.body.address
    });
  
    Kid.addKid(newKid, (err) => {
        if(err){
            res.json({success: false, msg:'Failed to add kid'});
        } else {
            res.json({success: true, msg:'Kid added'});
        }
    });
});

// Delete Kid
router.delete('/deletekid/:id', function(req, res, next){
    Kid.deleteKid(req.params.id, (err) => {
        if(err) {
            res.json({success: false, msg:'Failed to remove kid'});
        } else {
            res.json({success: true, msg:'Kid deleted'});
        }
    })
});

// Update Task
router.put('/editkid/:id', function(req, res, next){
    let updatedKid = new Kid({
        _id: req.body._id,
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        address: req.body.address
    });
    
    Kid.updateKid(updatedKid, (err) => {
        if(err){
            res.json({success: false, msg:'Failed to update kid'});
        } else {
            res.json({success: true, msg:'Kid updated'});
        }
    });
});

module.exports = router;