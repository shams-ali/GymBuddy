var mongoose = require('mongoose');
var crypto = require('crypto');

var StatSchema = new mongoose.Schema({
  user: String,
  weight: Number,
  height: Number,
  bmi: Number,
  class: 'text'
});

var calculateBMI = function (weight, height) {
  var bmi = weight / (height * height);
  return Math.round(bmi * 703);
};

StatSchema.pre('save', function (next) {
  var bmi = calculateBMI(this.weight, this.height);
  this.bmi = bmi;
  next();
});

module.exports = mongoose.model('Stat', StatSchema);
