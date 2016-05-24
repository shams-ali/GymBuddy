var mongoose = require('mongoose');
var crypto = require('crypto');

var StatSchema = new mongoose.Schema({
  weight: Number,
  height: Number,
  bmi: Number
});

var calculateBMI = function (weight, height) {
  var bmi = weight / (height * height);
  return bmi * 703;
};

StatSchema.pre('save', function (next) {
  var bmi = calculateBMI(this.weight, this.height);
  this.bmi = bmi;
  next();
});

module.exports = mongoose.model('Stat', StatSchema);
