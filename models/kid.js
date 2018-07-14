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
  }
});

const Kid = module.exports = mongoose.model('Kid', KidSchema);

module.exports.addKid = function(newKid, callback){
  newKid.save(callback);
}

module.exports.deleteKid = function(_id, callback){
  Kid.findOneAndRemove(_id, callback);
}

module.exports.getAllKids = function(callback){
  Kid.find(callback);
}