var mongoose = require('mongoose');
var crypto = require('crypto');

var StatSchema = new mongoose.Schema({
  user: String,
  age: Number,
  sex: String,
  weight: Number,
  height: Number,
  bmi: Number,
  bmiClass: String,
  bmr: Number
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

var calculateBMR = function(weight, height, sex, age) {
  var weightkg = weight / 2.2;
  var heightcm = height * 2.54;
  if (sex === 'male') {
    return Math.round(66.47 + (13.75 * weightkg) + (5 * heightcm) - (6.75 * age));
  }
  if (sex === 'female') {
    return Math.round(665.09 + (9.56 * weightkg) + (1.84 * heightcm) - (4.67 * age));
  }
};

StatSchema.pre('save', function (next) {
  var bmi = calculateBMI(this.weight, this.height);
  var bmiClass = calculateClass(bmi);
  var bmr = calculateBMR(this.weight, this.height, this.sex, this.age);
  this.bmi = Math.round(bmi);
  this.bmiClass = bmiClass;
  this.bmr = bmr;
  next();
});

module.exports = mongoose.model('Stat', StatSchema);
