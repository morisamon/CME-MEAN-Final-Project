const mongoose = require('mongoose');

// GameSession Schema
const GameSessionSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const GameSession = module.exports = mongoose.model('GameSession', GameSessionSchema);