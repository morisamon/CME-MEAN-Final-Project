const mongoose = require('mongoose');

// GameSession Schema
const GameSessionSchema = mongoose.Schema({
  kidid: {
    type: Number,
    required: true
  },

  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  video_duration: {
    type: Number,
    required: true
  },
  areas: {
    type: JSON,
    required: true
  }
});

const GameSession = module.exports = mongoose.model('GameSession', GameSessionSchema);

module.exports.addSession = function(newSession, callback){
  newSession.save(callback);
}

module.exports.deleteSession = function(_id, callback){
  GameSession.findByIdAndRemove(_id, callback);
}

module.exports.getAllSession = function(_id, callback){
  GameSession.find(_id, callback);
}