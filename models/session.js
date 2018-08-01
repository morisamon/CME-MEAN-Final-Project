const mongoose = require('mongoose');

// GameSession Schema
const GameSessionSchema = mongoose.Schema({
  kidid: {
    type: Number,
    required: true
  },

  character: {
    type: String,
    required: true
  },

  level: {
    type: Number,
    required: true
  },

  total_time: {
    type: Number,
    required: true
  },

  video_duration: {
    type: Number,
    required: true
  },

  areas: {
    type: JSON,
    required: true
  },

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