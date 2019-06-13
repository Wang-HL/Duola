const mongoose = require('mongoose');


const commoditySchema = new mongoose.Schema({
  name: String,
  norm: String,
  status: String,
  endTime: String,
  arrivalTime: String
}, {
  versionKey: false,
});

module.exports = mongoose.model('commodity', commoditySchema, 'commodity');