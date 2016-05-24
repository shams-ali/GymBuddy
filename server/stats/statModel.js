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
  bmr: Number,
  active: String,
  calNeed: Number
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
  if (sex === 'Male') {
    return 66.47 + (13.75 * weightkg) + (5 * heightcm) - (6.75 * age);
  }
  if (sex === 'Female') {
    return 665.09 + (9.56 * weightkg) + (1.84 * heightcm) - (4.67 * age);
  }
};

var calculateCal = function(active, bmr) {
  if (active === 'Sedentary') {
    return Math.round(bmr * 1.2);
  }
  if (active === 'Lightly Active') {
    return Math.round(bmr * 1.375);
  }
  if (active === 'Moderately Active') {
    return Math.round(bmr * 1.55);
  }
  if (active === 'Very Active') {
    return Math.round(bmr * 1.725);
  }
  if (active === 'Extra Active') {
    return Math.round(bmr * 1.9);
  }
};

StatSchema.pre('save', function (next) {
  var bmi = calculateBMI(this.weight, this.height);
  var bmiClass = calculateClass(bmi);
  var bmr = Math.round(calculateBMR(this.weight, this.height, this.sex, this.age));
  this.bmi = Math.round(bmi);
  this.bmiClass = bmiClass;
  this.bmr = bmr;
  this.calNeed = calculateCal(this.active, bmr);
  next();
});

module.exports = mongoose.model('Stat', StatSchema);
