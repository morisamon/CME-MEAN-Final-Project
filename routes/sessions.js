var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('cme', ['gamesessions']);
const GameSession = require('../models/session');

// Get All Sessions By Kid ID
router.get('/sessions/:kidid', function(req, res, next) {
    GameSession.find({ kidid : Number(req.params.kidid) }, function(err, sessions) {
        if(err) {
            res.send("Error");
        }
        res.json(sessions);
    })
});

// Save Session
router.post('/addsession', function(req, res, next){
    let newSession = new GameSession({
        kidid: req.body.kidid,
        character: req.body.character,
        level: req.body.level,
        total_time: req.body.total_time,
        video_duration: req.body.video_duration,
        areas: req.body.areas
    });

    GameSession.addSession(newSession, (err) => {
        if(err){
            res.json({success: false, msg:'Failed to add session'});
        } else {
            res.json({success: true, msg:'Session added'});
        }
    });
});

// Delete Session
router.delete('/deletesession/:_id', function(req, res, next){
    GameSession.deleteSession(req.params._id, (err) => {
        if(err) {
            res.json({success: false, msg:'Failed to remove session'});
        } else {
            res.json({success: true, msg:'Session deleted'});
        }
    })
});


module.exports = router;