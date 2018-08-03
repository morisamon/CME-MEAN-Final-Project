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

// Get All sessions With Filter
router.get('/sessionsfilter', function(req, res, next) {
    var query = { total_time: { $lt: req.query.total_time } };
    query.kidid = req.query.kidid;
    if (Number(req.query.level) > 0)
        query.level = req.query.level;
    if (req.query.character.length > 0)
        query.character = req.query.character;
    GameSession.find(query, function(err, sessions) {
        if(err) {
            res.send("Error");
        }
        res.json(sessions);
    })
});

module.exports = router;