var Q = require('q');
var jwt = require('jwt-simple');
var Stat = require('./statModel.js');

//promisify
var findStat = Q.nbind(Stat.findOne, Stat);
var createStat = Q.nbind(Stat.create, Stat);
var findAllStats = Q.nbind(Stat.find, Stat);

module.exports = {
  allStats: function (req, res, next) {
    var token = req.body.token;
    var user = jwt.decode(token, 'secret').username;
    console.log('this is user in allStat: ', user);
    findAllStats({user: user})
      .then(function (match) {
        console.log('this is stats in allStats: ', match);
        res.send(match);
      })
      .fail(function (error) {
        next(error);
      });
  },
  newStat: function (req, res, next) {
    var token = req.body.token;
    var user = jwt.decode(token, 'secret').username;
    console.log('this is user in newStat: ', user);
    var height = req.body.height;
    var weight = req.body.weight;
    var sex = req.body.sex;
    console.log('this is sex in newStat:', sex);
    var age = req.body.age;
    var active = req.body.active;
    console.log('this is active in newstat', active);
    findStat({user: user})
    .then(function(match) {
      if (match) {
        console.log('match in findstat');
        match.weight = weight;
        match.height = height;
        match.sex = sex;
        match.age = age;
        match.active = active;
        match.save();
        res.send(match);
      } else {
        var newStat = {
          user: user,
          sex: sex,
          age: age,
          weight: weight,
          height: height,
          active: active
        };
        console.log('creating newStat');
        return createStat(newStat);
      }
    })
    .then(function(createdStat) {
      if (createdStat) {
        console.log('created newStat');
        res.json(createdStat);
      }
    })
    .fail(function(error) {
      next(error);
    });
  }
};
