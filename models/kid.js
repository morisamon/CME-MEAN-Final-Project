const mongoose = require('mongoose');
const config = require('../config/database');

// Kid Schema
const KidSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  }
});

const Kid = module.exports = mongoose.model('Kid', KidSchema);

module.exports.addKid = function(newKid, callback){
  newKid.save(callback);
}

module.exports.updateKid = function(updatedKid, callback){
  Kid.findByIdAndUpdate(updatedKid._id, updatedKid, { new: true }, callback);
}

module.exports.deleteKid = function(_id, callback){
  Kid.findByIdAndRemove(_id, callback);
}

module.exports.getAllKids = function(callback){
  Kid.find(callback);
}