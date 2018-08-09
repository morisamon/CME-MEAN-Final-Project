const mongoose = require('mongoose');

// GameSession Schema
const SvmVectorSchema = mongoose.Schema({
  total_time: {
    type: Number,
    required: true
  },

  video_duration: {
    type: Number,
    required: true
  },

  vagrancy_time: {
    type: Number,
    required: true
  },

  area1: {
    type: Number,
    required: true
  },

  area2: {
    type: Number,
    required: true
  },

  area3: {
    type: Number,
    required: true
  },

  area4: {
    type: Number,
    required: true
  },

  area5: {
    type: Number,
    required: true
  },

  area6: {
    type: Number,
    required: true
  },

  areaface: {
    type: Number,
    required: true
  },

  areaeyes: {
    type: Number,
    required: true
  },

  label: {
    type: Number,
    required: true
  },

});

const SvmVector = module.exports = mongoose.model('SvmVector', SvmVectorSchema);

module.exports.addVector = function(newVector, callback){
  newVector.save(callback);
}

module.exports.getDataset = function(callback){
    SvmVector.find(callback);
}



