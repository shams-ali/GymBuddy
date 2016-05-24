var mongoose = require('mongoose');
var crypto = require('crypto');

var StatSchema = new mongoose.Schema({
  user: String,
  weight: Number,
  height: Number,
  bmi: Number,
  bmiClass: String
});

var calculateBMI = function (weight, height) {
  var bmi = weight / (height * height);
  return bmi * 703;
};

var calculateClass = function(bmi) {
  if (bmi <= 18.5) {
    return 'UnderWeight';
  } else if (bmi <= 24.99) {
    return 'Normal Weight';
  } else if (bmi <= 29.99) {
    return 'Overweight';
  } else if (bmi <= 34.99) {
    return 'Obesity (class 1)';
  } else if (bmi <= 39.99) {
    return 'Obesity (class 2)';
  } else if (bmi >= 40) {
    return 'Morbid Obesity';
  }
};

StatSchema.pre('save', function (next) {
  var bmi = calculateBMI(this.weight, this.height);
  var bmiClass = calculateClass(bmi);
  this.bmi = Math.round(bmi);
  this.bmiClass = bmiClass;
  next();
});

module.exports = mongoose.model('Stat', StatSchema);
