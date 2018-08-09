var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('cme', ['svmvectors']);
const SvmVector = require('../models/svmvector');

// Get All SVM Vectors
router.get('/svmvectors', function(req, res, next) {
    SvmVector.find({}, function(err, vectors) {
        if(err) {
            res.send("Error");
        }
        res.json(vectors);
    })
});

// Save Vector
router.post('/addvector', function(req, res, next){
    let newSvmVector = new SvmVector({
        total_time: req.body.total_time,
        video_duration: req.body.video_duration,
        vagrancy_time: req.body.vagrancy_time,
        area1: req.body.area1,
        area2: req.body.area2,
        area3: req.body.area3,
        area4: req.body.area4,
        area5: req.body.area5,
        area6: req.body.area6,
        areaface: req.body.areaface,
        areaeyes: req.body.areaeyes,
        label: req.body.label
    });
  
    SvmVector.addVector(newSvmVector, (err) => {
        if(err){
            res.json({success: false, msg:'Failed to add SvmVector'});
        } else {
            res.json({success: true, msg:'SvmVector added'});
        }
    });
});

module.exports = router;